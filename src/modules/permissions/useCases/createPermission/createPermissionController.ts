import { Response } from "express";
import { Controller } from "../../../../services/core/controller";
import { DecodedExpressRequest } from "../../../../infra/http/decodedExpressRequest";
import { CreatePermissionDTO } from "./createPermissionDTO";
import { CreatePermissionUseCase } from "./createPermissionUseCase";

export class CreatePermissionController extends Controller {
  private useCase: CreatePermissionUseCase;

  constructor(useCase: CreatePermissionUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(request: DecodedExpressRequest, response: Response) {
    const dto: CreatePermissionDTO = {
      name: request.body.name,
      description: request.body.description,
    };

    const result = await this.useCase.execute(dto);

    return this.sendResponse(response, 201, result);
  }
}
