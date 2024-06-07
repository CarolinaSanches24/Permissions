import { Response } from "express";
import { Controller } from "../../../../services/core/controller";
import { DecodedExpressRequest } from "../../../../infra/http/decodedExpressRequest";
import { CreateRoleDTO } from "./createRoleDTO";
import { CreateRoleUseCase } from "./createRoleUseCase";

export class CreateRoleController extends Controller {
  private useCase: CreateRoleUseCase;

  constructor(useCase: CreateRoleUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(request: DecodedExpressRequest, response: Response) {

    const dto: CreateRoleDTO = {
      name: request.body.name,
      description: request.body.description,
      permissionsIds:request.body.permissionsIds
    };

    await this.useCase.execute(dto);

    return this.sendResponse(response, 204);
  }
}
