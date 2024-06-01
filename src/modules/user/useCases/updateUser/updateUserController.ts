import { Response } from "express";
import { DecodedExpressRequest } from "../../../../infra/http/decodedExpressRequest";
import { Controller } from "../../../../services/core/controller";
import { UpdateUserDTO } from "./updateUserDTO";
import { UpdateUserUseCase } from "./updateUseCase";
export class UpdateUserController extends Controller {
  private useCase: UpdateUserUseCase;

  constructor(useCase: UpdateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(request: DecodedExpressRequest, response: Response) {

    const { id } = request.params;

    const dto: UpdateUserDTO = {
      id:parseInt(id),
      phone: request.body.phone,
      email: request.body.email,
      password: request.body.password,
    };

    const result = await this.useCase.execute(dto);

    return this.sendResponse(response, 201, result);
  }
}
