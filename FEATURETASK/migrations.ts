import path from "path";
import fs from "fs/promises";
import color from "@color";

(async () => {
    if (require.main === module) {
        const args = process.argv.slice(2);

        const showHeader = () => {
            color(["\n════════════════════════════════════", "brightMagenta", ["bold", "underline"]]);
            color(["📦 MIGRATION CLI TOOL", "brightCyan", "bold"]);
            color(["════════════════════════════════════", "brightMagenta", ["bold", "underline"]]);
        };

        const showUsage = () => {
            showHeader();
            color(["Usage: node migration.js <command> <tableName> [...params]", "yellow", "bold"]);
            color(["\nAvailable commands:", "brightMagenta", "bold"]);
            color(["  create <tableName>", "green", "bold"], ["→ Create a new table", "white"]);
            color(["  drop <tableName>", "green", "bold"], ["→ Drop an existing table", "white"]);
            color(["  truncate <tableName>", "green", "bold"], ["→ Truncate a table", "white"]);
            color(["  exists <tableName>", "green", "bold"], ["→ Check if a table exists", "white"]);
            color(["  addColumn <tableName> <columnName> <type...>", "green", "bold"], ["→ Add a column", "white"]);
            color(["  dropColumn <tableName> <columnName>", "green", "bold"], ["→ Drop a column", "white"]);
            color(["  rename <tableName> <newTableName>", "green", "bold"], ["→ Rename a table", "white"]);
            color(["  sql <tableName> <query>", "green", "bold"], ["→ Execute raw SQL", "white"]);
            color(["\n⚡ Example:", "yellow", "bold"], ["npm migration addColumn users age INT", "white"]);
            color(["════════════════════════════════════\n", "brightMagenta", ["bold", "underline"]]);
        };

        if (args.length === 0) {
            showUsage();
            process.exit(1);
        }

        const [command, tableName, ...rest] = args;

        if (!tableName) {
            color(["❌ Please specify a table name.", "red", "bold"]);
            process.exit(1);
        }

        const migrationFolder = path.resolve(__dirname, "../database/migrations");
        const filePattern = new RegExp(`^${tableName.toLowerCase()}_\\d+\\.ts$`);
        const files = await fs.readdir(migrationFolder);
        const migrationFile = files.find(f => filePattern.test(f));

        if (!migrationFile) {
            color([`❌ No migration file found for table '${tableName}'`, "red", "bold"]);
            process.exit(1);
        }

        const fullPath = path.join(migrationFolder, migrationFile);
        const migrationModule = await import(fullPath);
        const table = await migrationModule.default;
        console.log(table);

        const migration = table.migration;
        
        try {
            switch (command) {
                case "create":
                    await migration.createTable();
                    break;
                case "drop":
                    await migration.dropTable();
                    break;
                case "truncate":
                    await migration.truncateTable();
                    break;
                case "exists":
                    const exists = await migration.tableExists();
                    color([`🧾 Table ${tableName} exists: ${exists}`, "cyan", "bold"]);
                    break;
                case "addColumn":
                    if (rest.length < 2) {
                        color(["❌ Usage: addColumn <tableName> <columnName> <type...>", "red", "bold"]);
                        break;
                    }
                    await migration.addColumn(rest[0], rest.slice(1));
                    break;
                case "dropColumn":
                    if (rest.length < 1) {
                        color(["❌ Usage: dropColumn <tableName> <columnName>", "red", "bold"]);
                        break;
                    }
                    await migration.dropColumn(rest[0]);
                    break;
                case "rename":
                    if (rest.length < 1) {
                        color(["❌ Usage: rename <tableName> <newTableName>", "red", "bold"]);
                        break;
                    }
                    await migration.renameTable(rest[0]);
                    break;
                case "sql":
                    if (rest.length < 1) {
                        color(["❌ Usage: sql <tableName> <query>", "red", "bold"]);
                        break;
                    }
                    const result = await migration.sql(rest.join(" "), []);
                    color(["📄 SQL Result:", "brightGreen", "bold"], [JSON.stringify(result), "white"]);
                    break;
                case "seeder":
                    console.log("Running seeder...");
                    const payload = await table.seeder();
                    color(["📦 Seeder Result:", "brightGreen", "bold"], [JSON.stringify(payload), "white"]);
                    break;
                default:
                    color([`❌ Unknown command '${command}'`, "red", "bold"]);
                    showUsage();
                    break;
            }
        } catch (error: any) {
            color(["❌ Command failed:", "red", "bold"], [error.sqlMessage || error.message, "white"]);
        } finally {
            process.exit(1);
        }
    }
})();
