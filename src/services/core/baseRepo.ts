import { MySqlInt, MySqlTable } from "drizzle-orm/mysql-core";
import { db } from "../../infra/db/connection";
import { eq, sql } from "drizzle-orm";

export abstract class BaseRepo {
  private table: MySqlTable;

  constructor(table: MySqlTable) {
    this.table = table;
  }

  public async insert(data: object): Promise<{ id: number; pid: string }> {
    const result = await db.insert(this.table).values(data).execute();

    return {
      id: result[0].insertId,
      pid: (data as any).pid,
    };
  }

  public async update(id: number, data: object): Promise<void> {

    await db
      .update(this.table)
      .set(data)
      .where(eq(sql`id`, id))
      .execute();
  }
}
