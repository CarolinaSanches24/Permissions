import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { baseColumns } from "../baseColumns";

export const permissionsRolesSchema = mysqlTable('permissionsRoles',{
    ...baseColumns,
    roleId:int('roleId'),
    permissionId:int('permissionId')
});