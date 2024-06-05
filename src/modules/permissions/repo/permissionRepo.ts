import { BaseRepo } from '../../../services/core/baseRepo';
import { permissionsSchema } from '../../../infra/db/schemas/permissions/permissionsSchema';
import { Permission } from '../domain/permission';
import { permissionMapper } from '../mapper/permissionMapper';
import { db } from '../../../infra/db/connection';
import { eq } from 'drizzle-orm';

export class PermissionRepo extends BaseRepo {
    constructor() {
        super(permissionsSchema); 
    }

	public async insert(data: Permission): Promise<{id:number, pid:string}> {
		return super.insert(data);
	  }
	  
	public async update(id: number, data: object): Promise<void> {
		return super.update(id,data);
	}

    public async findPermission(name:string):Promise<Permission|undefined>{

		const res = await db.select().from(permissionsSchema).where(eq(permissionsSchema.name, name));
        
		if (res.length > 0) {
			return permissionMapper.toDomain(res[0]);
		  }

		  return undefined;
		 
		}
    }

export const permissionRepo = new PermissionRepo();