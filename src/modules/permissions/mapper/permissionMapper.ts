import { BaseMapper } from '../../../services/core/baseMapper';
import { Permission } from '../domain/permission';

class PermissionMapper extends BaseMapper {
	constructor() {
		super();
	}

	toDomain(raw: object): Permission {
		return raw as Permission;
	}

	toPublicDomain(raw: Permission): Omit<Permission,'id'> {
		const {id, ...publicPermission} = raw;
        return publicPermission;
	}

	toPersistence(data: any): string {
		throw new Error('Method not implemented.');
	}
}

export const permissionMapper = new PermissionMapper();