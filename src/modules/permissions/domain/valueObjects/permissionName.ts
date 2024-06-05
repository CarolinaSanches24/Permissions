import { ValueObject, ValueObjectEval } from "../../../../services/core/valueObjectError";

class PermissionName extends ValueObject<string> {
	constructor(props: string) {
		super(props);
	}
}

class PermissionNameEval extends ValueObjectEval<string> {
	
	constructor() {
		super('name');
	}

	evaluate(value:string): PermissionName {
		this.guard.againstNullOrUndefined(value);
		return new PermissionName(value);
	}
}

export const permissionNameEval = new PermissionNameEval();