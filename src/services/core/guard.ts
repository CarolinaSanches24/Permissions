import { HttpError } from './httpError';

export class GuardError extends HttpError {
	constructor(error: string, body: object) {
		super(422, error, body);
		this.name = 'GuardError';
	}
}

export class Guard {
	private readonly argumentName: string;

	constructor(argumentName: string) {
		this.argumentName = argumentName;
	}

	public againstRegex(regex: RegExp, argument: string) {
		if (!regex.test(argument)) throw new GuardError(`${this.argumentName} é inválido`, { argument });
	}

	public againstAtLeast(numChars: number, argument: string) {
		if (argument.length < numChars) throw new GuardError(`${this.argumentName} deve ter pelo menos ${numChars} caracteres`, { argument });
	}

	public againstAtMost(numChars: number, argument: string) {
		if (argument.length > numChars) throw new GuardError(`${this.argumentName} deve ter no máximo ${numChars} caracteres`, { argument });
	}

	public againstNullOrUndefined(argument: any) {
		if (argument === null || argument === undefined) throw new GuardError(`${this.argumentName} é nulo ou indefinido`, { argument });
	}

	public againstBadJson<T>(json: JSON) {
		for (const key in json) {
			if (json.hasOwnProperty(key) === false) throw new GuardError(`${this.argumentName} não é um JSON válido`, {});
		}
	}

	public againstBadEnum(e: { [s: number]: string }, argument: any) {
		if (!Object.values(e).includes(argument)) throw new GuardError(`${this.argumentName} não é um enum válido`, { argument });
	}
}