import { ValueObject, ValueObjectEval } from "../../../../services/core/valueObjectError";

class RoleName extends ValueObject<string> {
	constructor(props: string) {
		super(props);
	}
}

class RoleNameEval extends ValueObjectEval<string> {
	
	constructor() {
		super('name');
	}

	evaluate(value:string): RoleName {
		this.guard.againstNullOrUndefined(value);
		return new RoleName(value);
	}
}

export const roleNameEval = new RoleNameEval();