import { BaseMapper } from '../../../services/core/baseMapper';
import {User} from '../domain/user';

class UserMapper extends BaseMapper {
	constructor() {
		super();
	}

	toDomain(raw: object): User {
		return raw as User;
	}

	toPublicDomain(raw: User): Omit<User,'id'|'password'> {
		const {id, password, ...publicUser} = raw;
        return publicUser;
	}

	toPersistence(data: any): string {
		throw new Error('Method not implemented.');
	}
}

export const userMapper = new UserMapper();