import { BaseRepo } from '../../../services/core/baseRepo';
import { db } from '../../../infra/db/connection';
import { eq } from 'drizzle-orm';
import { rolesSchema } from '../../../infra/db/schemas/roles/rolesSchema';
import { Role } from '../domain/role';
import { roleMapper } from '../mapper/roleMapper';
import { permissionsRolesSchema } from '../../../infra/db/schemas/permissionsRoles/permissionsRolesSchema';
import { v4 } from 'uuid';

export class RoleRepo extends BaseRepo {
    constructor() {
        super(rolesSchema); 
    }

	public async insertWithPermissions(role: Role, permissionsIds: number[]): Promise<{ id: number, pid: string }> {
        const roleRecord = await super.insert(role);
        
        console.log('Role record inserted:', roleRecord); // Debug line

        const permissionsRolesRecords = permissionsIds.map(permissionId => ({
            pid: v4(),
            roleId: roleRecord.id,
            permissionId
        }));
        
        console.log('PermissionsRoles records to insert:', permissionsRolesRecords); // Debug line

        await db.insert(permissionsRolesSchema).values(permissionsRolesRecords);
        
        return roleRecord;
    }

	
	  
	public async update(id: number, data: object): Promise<void> {
		return super.update(id,data);
	}

    public async findRole(name:string):Promise<Role|undefined>{

		const res = await db.select().from(rolesSchema).where(eq(rolesSchema.name, name));
        
		if (res.length > 0) {
			return roleMapper.toDomain(res[0]);
		  }

		  return undefined;
		 
		}
    }

export const roleRepo = new RoleRepo();