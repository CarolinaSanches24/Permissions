import { BaseRepo } from '../../../services/core/baseRepo';
import { db } from '../../../infra/db/connection';
import { eq } from 'drizzle-orm';
import { rolesSchema } from '../../../infra/db/schemas/roles/rolesSchema';
import { Role } from '../domain/role';
import { roleMapper } from '../mapper/roleMapper';

export class RoleRepo extends BaseRepo {
    constructor() {
        super(rolesSchema); 
    }

	public async insert(data: Role): Promise<{id:number, pid:string}> {
		return super.insert(data);
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