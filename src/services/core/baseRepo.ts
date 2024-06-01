import { MySqlTable} from "drizzle-orm/mysql-core";
import { db } from "../../infra/db/connection";
import { SQL, eq } from "drizzle-orm";

export abstract class BaseRepo<TColumnsMap extends Record<string, any>> {
    private table: MySqlTable;
    private columns: TColumnsMap; 

    constructor(table: MySqlTable, columns: TColumnsMap) {
        this.table = table;
        this.columns = columns;
    }

    public async insert(data: object): Promise<{id:number, pid:string}> {
        const result = await db.insert(this.table).values(data).execute();

        return {
            id: result[0].insertId,
            pid: (data as any).pid
        };
    }

    async update(id: number, data: object): Promise<void> {
        const whereClause: SQL<unknown> = eq(this.columns.id, id);

        await db.update(this.table).set(data).where(whereClause).execute();
        }
}