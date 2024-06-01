import {Response} from 'express';
import { CreateUserDTO } from './createUserDTO';
import { CreateUserUseCase } from './createUserUseCase';
import { Controller } from '../../../../services/core/controller';
import { DecodedExpressRequest } from '../../../../infra/http/decodedExpressRequest';
export class CreateUserController extends Controller {
	private useCase: CreateUserUseCase;

	constructor(useCase: CreateUserUseCase) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(request: DecodedExpressRequest, response: Response) {
		const dto: CreateUserDTO = {
			phone: request.body.phone,
			email: request.body.email,
			password: request.body.password,
			// roleId: undefined,
		};

		await this.useCase.execute(dto);

		return this.sendResponse(response, 201);
	}
}
