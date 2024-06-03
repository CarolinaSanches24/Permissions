import { eq } from 'drizzle-orm';
import { db } from '../../../infra/db/connection';
import { userSchema } from '../../../infra/db/schemas/user/userSchema';
import { BaseRepo } from '../../../services/core/baseRepo';
import { User } from '../domain/user';
import { userMapper } from '../mapper/userMapper';
export class UserRepo extends BaseRepo {
    constructor() {
        super(userSchema); 
    }

	public async insert(data: User): Promise<{id:number, pid:string}> {
		return super.insert(data);
	  }
	  
	public async update(id: number, data: object): Promise<void> {
		return super.update(id,data);
	}

	public async findByEmail(email:string):Promise<User|undefined>{

		const res = await db.select().from(userSchema).where(eq(userSchema.email, email));
		
		if (res.length > 0) {
			return userMapper.toDomain(res[0]);
		  }

		  return undefined;

		 
		}
	}



export const userRepo = new UserRepo();