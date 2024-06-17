import { v4 } from "uuid";
import { UseCase, UseCaseError } from "../../../../services/core/useCase";
import { roleNameEval } from "../../domain/valueObjects/roleName";
import { RoleRepo } from "../../repo/roleRepo";
import { PermissionRepo } from "../../../permissions/repo/permissionRepo";
import { CreateRoleDTO, CreateRoleResponseDTO } from "./createRoleDTO";

export class CreateRoleUseCase implements UseCase<CreateRoleDTO, Promise<CreateRoleResponseDTO>> {
  private roleRepo: RoleRepo;
  private permissionRepo: PermissionRepo;

  constructor(roleRepo: RoleRepo, permissionRepo: PermissionRepo) {
    this.roleRepo = roleRepo;
    this.permissionRepo = permissionRepo;
  }

  public async execute(request: CreateRoleDTO): Promise<CreateRoleResponseDTO> {
    const name = roleNameEval.evaluate(request.name);

    const existRole = await this.roleRepo.findRole(name.value);
    if (existRole) throw new UseCaseError('Role already exists', 400);

     await this.permissionRepo.findPermissionsByIds(request.permissionsIds);
   

    const role = {
      pid: v4(),
      name: request.name,
      description: request.description
    };


    await this.roleRepo.insertWithPermissions(role, request.permissionsIds);

    return {role, permissions:request.permissionsIds}

  }
}