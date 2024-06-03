import {Response} from 'express';
import { Controller } from '../../../../services/core/controller';
import { DecodedExpressRequest } from '../../../../infra/http/decodedExpressRequest';
import { SessionUserDTO } from './sessionUserDTO';
import { SessionUserUseCase } from './sessionUserUseCase';

export class SessionUserController extends Controller {
	private useCase: SessionUserUseCase;

	constructor(useCase: SessionUserUseCase) {
		super();
		this.useCase = useCase;
	}

	async executeImpl(request: DecodedExpressRequest, response: Response) {
		
        const dto: SessionUserDTO = {
			email: request.body.email,
			password: request.body.password,
		};

		const result = await this.useCase.execute(dto);

		return this.sendResponse(response, 200, result);
	}
}
