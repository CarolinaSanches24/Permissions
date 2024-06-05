import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { baseColumns } from "../baseColumns";

export const rolesSchema = mysqlTable('roles',{
    ...baseColumns,
    name:varchar('name', {length:191}),
    description:varchar('description', {length:191}),
});
