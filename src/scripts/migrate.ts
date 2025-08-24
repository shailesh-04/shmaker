// Enhanced type definitions
type SchemaType =
    | 'string'
    | 'int'
    | 'bigint'
    | 'decimal'
    | 'date'
    | 'datetime'
    | 'timestamp'
    | 'text'
    | 'json'
    | 'boolean'
    | 'id'
    | string;

type Constraint =
    | 'null'
    | 'uniq'
    | 'notnull'
    | 'pk'
    | 'auto_increment'
    | string;

interface FieldDefinition {
    name: string;
    type: SchemaType;
    length?: string;
    constraints?: Constraint[];
    defaultValue?: string;
    onUpdate?: string;
}

interface TableSchema {
    name: string;
    fields: FieldDefinition[];
    engine?: string;
    charset?: string;
    collate?: string;
}

// MySQL configuration interface
interface MySQLConfig {
    engine?: string;
    charset?: string;
    collate?: string;
    autoIncrementStart?: number;
}

// Default MySQL configuration
const DEFAULT_MYSQL_CONFIG: MySQLConfig = {
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    autoIncrementStart: 1
};

// Main conversion function
function convertSchemaToMySQL(schema: string, config: MySQLConfig = {}): string {
    const mergedConfig = { ...DEFAULT_MYSQL_CONFIG, ...config };
    const tableSchema = parseSchema(schema);
    
    return generateMySQLCreateTable(tableSchema, mergedConfig);
}

// Parse the schema string into structured data
function parseSchema(schema: string): TableSchema {
    const lines = schema.trim().split('\n').map(line => line.trim()).filter(line => line);
    
    // Extract table name from first line
    const firstLine = lines[0];
    const tableNameMatch = firstLine.match(/^(\w+)\(/);
    if (!tableNameMatch) {
        throw new Error('Invalid schema format: Could not find table name');
    }
    
    const tableName = tableNameMatch[1];
    const fields: FieldDefinition[] = [];

    // Process field lines (skip first and last lines)
    for (let i = 1; i < lines.length - 1; i++) {
        const line = lines[i].replace(/,$/, '').trim();
        if (!line) continue;

        const field = parseFieldLine(line);
        fields.push(field);
    }

    return { name: tableName, fields };
}

// Parse a single field line
function parseFieldLine(line: string): FieldDefinition {
    const tokens = line.trim().split(/\s+/).filter(token => token);
    const name = tokens[0];
    
    let typeToken = tokens[1];
    let length: string | undefined;
    let type: SchemaType;
    
    // Handle types with parentheses (decimal(10,2), string(100), etc.)
    const typeMatch = typeToken.match(/^(\w+)(?:\((.*?)\))?$/);
    if (typeMatch) {
        type = typeMatch[1] as SchemaType;
        length = typeMatch[2];
    } else {
        type = typeToken as SchemaType;
    }

    // Handle special id() case
    if (typeToken === 'id()') {
        type = 'id';
    }

    const constraints: Constraint[] = [];
    let defaultValue: string | undefined;
    let onUpdate: string | undefined;

    // Process remaining tokens as constraints
    for (let i = 2; i < tokens.length; i++) {
        const token = tokens[i];
        
        if (token === 'null' || token === 'uniq' || token === 'notnull' || token === 'pk' || token === 'auto_increment') {
            constraints.push(token);
        } 
        else if (token.startsWith('default(')) {
            const match = token.match(/default\((.*?)\)/);
            if (match) {
                defaultValue = match[1];
            }
        }
        else if (token.includes('on update')) {
            const match = token.match(/on update (.*)/);
            if (match) {
                onUpdate = match[1];
            }
        }
        else {
            constraints.push(token);
        }
    }

    return { name, type, length, constraints, defaultValue, onUpdate };
}

// Generate MySQL CREATE TABLE statement
function generateMySQLCreateTable(tableSchema: TableSchema, config: MySQLConfig): string {
    const { name, fields } = tableSchema;
    const { engine, charset, collate, autoIncrementStart } = config;

    let sql = `CREATE TABLE ${name} (\n`;
    const fieldDefinitions: string[] = [];
    const uniqueConstraints: string[] = [];
    const primaryKeyFields: string[] = [];

    // Process each field
    for (const field of fields) {
        let fieldSql = `  ${field.name} ${mapTypeToMySQL(field)}`;
        
        // Handle constraints - NOT NULL by default, NULL only if explicitly specified
        const constraints: string[] = [];
        
        // Default behavior: NOT NULL unless explicitly marked as 'null'
        let hasExplicitNullConstraint = false;
        
        if (field.constraints) {
            for (const constraint of field.constraints) {
                if (constraint === 'notnull') {
                    constraints.push('NOT NULL');
                } else if (constraint === 'null') {
                    hasExplicitNullConstraint = true;
                    constraints.push('NULL');
                } else if (constraint === 'uniq') {
                    uniqueConstraints.push(`UNIQUE KEY ${field.name}_unique (${field.name})`);
                } else if (constraint === 'pk') {
                    primaryKeyFields.push(field.name);
                } else if (constraint === 'auto_increment') {
                    constraints.push('AUTO_INCREMENT');
                }
            }
        }

        // If no explicit NULL constraint is found, default to NOT NULL
        if (!hasExplicitNullConstraint && !constraints.includes('NULL')) {
            constraints.push('NOT NULL');
        }

        // Handle default values
        if (field.defaultValue) {
            const defaultValue = mapDefaultValue(field.defaultValue);
            if (defaultValue) {
                constraints.push(`DEFAULT ${defaultValue}`);
            }
        }

        // Handle on update
        if (field.onUpdate) {
            const onUpdateValue = mapOnUpdateValue(field.onUpdate);
            if (onUpdateValue) {
                constraints.push(`ON UPDATE ${onUpdateValue}`);
            }
        }

        if (constraints.length > 0) {
            fieldSql += ' ' + constraints.join(' ');
        }

        fieldDefinitions.push(fieldSql);
    }

    // Add primary key constraint if specified
    if (primaryKeyFields.length > 0) {
        fieldDefinitions.push(`  PRIMARY KEY (${primaryKeyFields.join(', ')})`);
    }

    // Add unique constraints
    fieldDefinitions.push(...uniqueConstraints);

    sql += fieldDefinitions.join(',\n');
    sql += `\n) ENGINE=${engine} DEFAULT CHARSET=${charset}`;
    
    if (collate) {
        sql += ` COLLATE=${collate}`;
    }
    
    if (autoIncrementStart && autoIncrementStart > 1) {
        sql += ` AUTO_INCREMENT=${autoIncrementStart}`;
    }

    sql += ';';
    return sql;
}

// Map schema types to MySQL types
function mapTypeToMySQL(field: FieldDefinition): string {
    switch (field.type) {
        case 'id':
            return 'BIGINT UNSIGNED';
        case 'string':
            return `VARCHAR(${field.length || '255'})`;
        case 'int':
            return 'INT';
        case 'bigint':
            return 'BIGINT';
        case 'decimal':
            return `DECIMAL(${field.length || '10,2'})`;
        case 'date':
            return 'DATE';
        case 'datetime':
            return 'DATETIME';
        case 'timestamp':
            return 'TIMESTAMP';
        case 'text':
            return 'TEXT';
        case 'json':
            return 'JSON';
        case 'boolean':
            return 'TINYINT(1)';
        default:
            return field.type.toUpperCase();
    }
}

// Map default values to MySQL format
function mapDefaultValue(value: string): string {
    const lowerValue = value.toLowerCase();
    
    if (lowerValue === 'now' || lowerValue === 'current_timestamp') {
        return 'CURRENT_TIMESTAMP';
    }
    if (lowerValue === 'null') {
        return 'NULL';
    }
    if (lowerValue === 'true' || lowerValue === 'false') {
        return lowerValue.toUpperCase();
    }
    
    // Check if it's a string that needs quotes
    if (isNaN(Number(value)) && value !== '?' && !value.startsWith('(')) {
        return `'${value.replace(/'/g, "''")}'`;
    }
    
    return value;
}

// Map on update values
function mapOnUpdateValue(value: string): string {
    const lowerValue = value.toLowerCase();
    
    if (lowerValue === 'now' || lowerValue === 'current_timestamp') {
        return 'CURRENT_TIMESTAMP';
    }
    
    return value;
}

// Test function
function testSchemaConversion(): void {
    const testSchema = `
users(
  _id id(),
  name string,
  description text null,
  price decimal(10,2),
  quantity int,
  category string(100) null,
  brand string(100) null,
  sku string uniq,
  image_main_url string null,
  image_gallery_urls json null,
  created_at date default(now),
  updated_at date default(now on update now)
);
`;

    console.log('=== Input Schema ===');
    console.log(testSchema);
    
    console.log('=== MySQL Output ===');
    try {
        const mysqlSQL = convertSchemaToMySQL(testSchema);
        console.log(mysqlSQL);
        
        // Additional test with custom configuration
        console.log('\n=== With Custom Configuration ===');
        const customConfig: MySQLConfig = {
            engine: 'MyISAM',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            autoIncrementStart: 1000
        };
        const customSQL = convertSchemaToMySQL(testSchema, customConfig);
        console.log(customSQL);
        
    } catch (error: any) {
        console.error('Error:', error.message);
    }
}

// Run tests
testSchemaConversion();
