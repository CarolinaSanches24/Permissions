import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { baseColumns } from "../baseColumns";

export const permissionsSchema = mysqlTable('permissions',{
    ...baseColumns,
    name:varchar('name', {length:191}).notNull(),
    description:varchar('description', {length:191}).notNull(),
});