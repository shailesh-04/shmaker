export const migrationContent = (className, tableName) =>
    `import database from "@config/database";
import { TypeClass${className}, Type${className} } from "@interfaces/${tableName}";
import Migration from "@utils/migration";

class ${className} implements TypeClass${className} {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("${tableName}", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: Type${className}): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(\`INSERT INTO ${tableName}(demo) VALUES (?)\`, [demo]);
        return result;
    }
    async update(id: string, body: Type${className}): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(\`UPDATE ${tableName} SET demo = ? WHERE id = ?\`, [demo, id]);
        return result;
    }
    async read(): Promise<Type${className}[]> {
        const rows = await database.query(\`SELECT * FROM ${tableName} ORDER BY id DESC\`);
        return rows as Type${className}[];
    }
    async readOne(id: string): Promise<Type${className}[]> {
        const rows = await database.query(\`SELECT * FROM ${tableName} WHERE id = ?\`, [id]);
        return rows as Type${className}[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(\`DELETE FROM ${tableName} WHERE id = ?\`, [id]);
        return result;
    }
    public async seeder(): Promise<any[]> {
        const ${tableName} = [
            { demo:"demo" },
           
        ];
        const results = [];
        for (const category of ${tableName}) {
            const result = await this.create(category);
            results.push(result);
        }
        return results;
    }
}
export default ${className};
`;
export const interfaceContent = (
    className
) => `import Migration from "@utils/migration";
export interface Type${className} {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface TypeClass${className} {
    migration: Migration;
}`;
export const modelContent = (className, tableName, time) =>
    `import database from "@config/database";
import { Type${className} } from "@interfaces/${tableName}";
class ${className}Model {

    async create(body: Type${className}): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(\`INSERT INTO ${tableName}(demo) VALUES (?)\`, [demo]);
        return result;
    }
    async update(id: string, body: Type${className}): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(\`UPDATE ${tableName} SET demo = ? WHERE id = ?\`, [demo, id]);
        return result;
    }
    async read(): Promise<Type${className}[]> {
        const rows = await database.query(\`SELECT * FROM ${tableName} ORDER BY id DESC\`);
        return rows as Type${className}[];
    }
    async readOne(id: string): Promise<Type${className}[]> {
        const rows = await database.query(\`SELECT * FROM ${tableName} WHERE id = ?\`, [id]);
        return rows as Type${className}[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(\`DELETE FROM ${tableName} WHERE id = ?\`, [id]);
        return result;
    }
}
export default ${className}Model;`;


export const controllerContent = (
    className,
    tableName
) => `import ${className}Model from "@models/${tableName}";
import { Request, Response } from "express";
class ${className}Controller {
    private model: ${className}Model;
    constructor() {
        this.model = new ${className}Model();
    }
    //POST api/${tableName}
    create = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const payload: any = await this.model.create({ name });
            res.status(201).json({
                message: "Successfully created new Record!",
                payload: {
                    id: payload.insertId,
                    name
                }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to create new record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // GET api/${tableName}
    read = async (req: Request, res: Response) => {
        try {
            
            const result = await this.model.read();
            res.status(200).json({ ${tableName}: result });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/${tableName}/:id
    readOne = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const payload = await this.model.readOne(id);
            if (!payload || payload.length === 0) {
                return res.status(404).json({ message: "No available record with this ID!" });
            }
            res.status(200).json({ payload: payload[0] });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/${tableName}/:id
    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const payload: any = await this.model.update(id, { name });
            res.status(200).json({
                message: "Successfully Update Record!",
                payload: { id, name }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/${tableName}/:id
    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const payload = await this.model.exists(id);
            if (!payload || payload.length === 0) {
                return res.status(404).json({ message: "No available record with this ID!" });
            }
            await this.model.delete(id);
            res.status(200).json({
                message: "Successfully Deleted Record!"
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to delete record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
}
export default ${className}Controller;`;
export const routerContent = (tableName) =>
     `import { Router } from "express";
import ${tableName}Controller from "@controllers/categories";
const controller = new ${tableName}Controller();
const ${tableName}Router = Router();

${tableName}Router
    .route("/")
    .post(controller.create)
    .get(controller.read);

${tableName}Router
    .route("/:id")
    .get(controller.readOne)
    .put(controller.update)
    .delete(controller.delete);

export default ${tableName}Router;`;
