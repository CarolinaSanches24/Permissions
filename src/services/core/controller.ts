import { Request, Response } from 'express';
import { GuardError } from './guard';
import { UseCaseError } from './useCase';
import { ValueObjectError } from './valueObjectError';

interface IBaseController {
	execute(request: Request, response: Response): Promise<void>;

	sendResponse<T>(response: Response, code: number, dto?: T): Response;
}

export enum ResponseType {
	JSON,
	TEXT,
	HTML,
	XML,
	STREAM,
	REDIRECT,
	NOTHING,
	AUDIO,
}

export abstract class Controller implements IBaseController {

	protected abstract executeImpl(request: Request, response: Response): Promise<void | any>;

	private async handleException(response: Response, error: Error) {
		if (error instanceof GuardError || error instanceof UseCaseError || error instanceof ValueObjectError) {
			return response.status(error.code).json({
				message: error.message,
				errors: error.body ? error.body : undefined,
			});
		} else {
			console.log(error);
			console.error(error);
			return response.status(500).json({
				message: 'Internal Error',
			});
		}
	}

	public sendResponse<T>(response: Response, code: number, dto?: T, responseType: ResponseType = ResponseType.JSON): Response {
		if (!dto || code === 204) return response.sendStatus(code);

		switch (responseType) {
			case ResponseType.JSON:
				response.type('application/json');
				return response.status(code).json(dto);

			case ResponseType.NOTHING:
				return response.sendStatus(code);

			case ResponseType.AUDIO:
				if (!(dto instanceof Blob)) throw new UseCaseError('DTO is not BLOB', 500);

				response.type('audio/wav');
				dto.arrayBuffer().then((buf) => {
					response.send(Buffer.from(buf));
				});

				return response.status(code);

			default:
				return response.sendStatus(500);
		}
	}

	public async execute(request: Request, response: Response): Promise<void> {
		try {
			await this.executeImpl(request, response);
		} catch (error) {
			await this.handleException(response, error as Error);
		}
	}
}