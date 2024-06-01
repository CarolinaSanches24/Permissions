import { userSchema } from '../../../infra/db/schemas/user/userSchema';
import { BaseRepo } from '../../../services/core/baseRepo';
import { User } from '../domain/user';
export class UserRepo extends BaseRepo<User> {
    constructor() {
        super(userSchema, {} as User); 
    }

	public async insert(data: User): Promise<{id:number, pid:string}> {
		return super.insert(data);
	  }
	public async update(id: number, data: object): Promise<void> {
		return super.update(id,data);
	}
}


export const userRepo = new UserRepo();