import { MySqlTable } from "drizzle-orm/mysql-core";
import { db } from "../../infra/db/connection";


export abstract class BaseRepo{
    private table : MySqlTable;

    constructor(table:MySqlTable) {
        this.table = table;

    }
    
  public async create(data: object): Promise<any> {
        const result = await db.insert(this.table).values(data).execute();
        return result[0];   
    }

    async update(id: number, data:object): Promise<void> {
        await db.update(this.table).set(data).where().execute();
    }

    // async delete(id: number): Promise<void> {
    //    await db.delete().from(this.tableConfig.name).where({ id });
    // }
}
