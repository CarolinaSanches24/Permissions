import { userSchema } from '../../../infra/db/schemas/user/userSchema';
import { BaseRepo } from '../../../services/core/baseRepo';
import { User } from '../domain/user';
export class UserRepo extends BaseRepo{
	constructor() {
	  super(userSchema);
	}
  
	public async insert(data: User): Promise<any> {
	  return super.insert(data);
	}
  }

  export const userRepo = new UserRepo();