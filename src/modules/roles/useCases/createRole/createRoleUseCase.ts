import { v4 } from "uuid";
import { UseCase, UseCaseError } from "../../../../services/core/useCase";
import { CreateRoleDTO } from "./createRoleDTO";
import { RoleRepo } from "../../repo/roleRepo";

export class CreateRoleUseCase
  implements
    UseCase<CreateRoleDTO, Promise<void>>
{
  private roleRepo: RoleRepo;

  constructor(roleRepo: RoleRepo) {
    this.roleRepo = roleRepo;
  }

  public async execute(
    request: CreateRoleDTO
  ): Promise<void> {

    const existRole = await this.roleRepo.findRole(
      request.name
    );

    if(existRole)throw new UseCaseError('Role already exists',400);

    await this.roleRepo.insert({
      pid: v4(),
      name: request.name,
      description: request.description,
    });
    
  }
}
