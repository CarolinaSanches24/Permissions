import { BaseMapper } from '../../../services/core/baseMapper';
import { Role } from '../domain/role';

class RoleMapper extends BaseMapper {
	constructor() {
		super();
	}

	toDomain(raw: object): Role {
		return raw as Role;
	}

	toPublicDomain(raw: Role): Omit<Role,'id'> {
		const {id, ...publicRole} = raw;
        return publicRole;
	}

	toPersistence(data: any): string {
		throw new Error('Method not implemented.');
	}
}

export const roleMapper = new RoleMapper();