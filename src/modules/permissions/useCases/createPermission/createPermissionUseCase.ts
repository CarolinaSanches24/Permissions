import { v4 } from "uuid";
import { UseCase, UseCaseError } from "../../../../services/core/useCase";
import { CreatePermissionDTO, CreatePermissionResponseDTO } from "./createPermissionDTO";
import { PermissionRepo } from "../../repo/permissionRepo";
import { permissionNameEval } from "../../domain/valueObjects/permissionName";
import { permissionDescriptionEval } from "../../domain/valueObjects/permissionDescription";

export class CreatePermissionUseCase
  implements
    UseCase<CreatePermissionDTO, Promise<CreatePermissionResponseDTO>>
{
  private permissionRepo: PermissionRepo;

  constructor(permissionRepo: PermissionRepo) {
    this.permissionRepo = permissionRepo;
  }

  public async execute(
    request: CreatePermissionDTO
  ): Promise<CreatePermissionResponseDTO> {

    const name = permissionNameEval.evaluate(request.name);
    const description = permissionDescriptionEval.evaluate(request.description);

    const existPermission = await this.permissionRepo.findPermission(
      request.name
    );

    if(existPermission)throw new UseCaseError('Permission already exists',400);

    const permission = await this.permissionRepo.insert({
      pid: v4(),
      name: name.value,
      description: description.value,
    });

    return {
      id: permission.id,
      pid: permission.pid,
    };
  }
}
