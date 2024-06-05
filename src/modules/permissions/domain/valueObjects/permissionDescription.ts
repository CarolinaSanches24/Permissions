import { ValueObject, ValueObjectEval } from "../../../../services/core/valueObjectError";

class PermissionDescription extends ValueObject<string> {
	constructor(props: string) {
		super(props);
	}
}

class PermissionDescriptionEval extends ValueObjectEval<string> {
	
	constructor() {
		super('description');
	}

	evaluate(value:string): PermissionDescription {
		this.guard.againstNullOrUndefined(value);
		return new PermissionDescription(value);
	}
}

export const permissionDescriptionEval = new PermissionDescriptionEval();