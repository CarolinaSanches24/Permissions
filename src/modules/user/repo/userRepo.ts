import {User} from '../domain/user';
import { BaseRepo } from '../../../services/core/baseRepo';

export class UserRepo extends BaseRepo {
	constructor() {
		super('Users');
	}

	public async insert(data: User) {
		return await super.insert(data);
	}

}
