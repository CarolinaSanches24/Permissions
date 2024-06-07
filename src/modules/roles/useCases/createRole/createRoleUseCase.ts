import { v4 } from "uuid";
import { UseCase, UseCaseError } from "../../../../services/core/useCase";
import { roleNameEval } from "../../domain/valueObjects/roleName";
import { RoleRepo } from "../../repo/roleRepo";
import { PermissionRepo } from "../../../permissions/repo/permissionRepo";
import { CreateRoleDTO } from "./createRoleDTO";

export class CreateRoleUseCase implements UseCase<CreateRoleDTO, Promise<void>> {
  private roleRepo: RoleRepo;
  private permissionRepo: PermissionRepo;

  constructor(roleRepo: RoleRepo, permissionRepo: PermissionRepo) {
    this.roleRepo = roleRepo;
    this.permissionRepo = permissionRepo;
  }

  public async execute(request: CreateRoleDTO): Promise<void> {
    const name = roleNameEval.evaluate(request.name);

    const existRole = await this.roleRepo.findRole(name.value);
    if (existRole) throw new UseCaseError('Role already exists', 400);

    const permissions = await this.permissionRepo.findPermissionsByIds(request.permissionsIds);
    // if (permissions.length !== request.permissionsIds.length) {
    //   throw new UseCaseError ('Some permissions are invalid', 400);
    // }

    const role = {
      pid: v4(),
      name: request.name,
      description: request.description
    };

    console.log('Role DTO:', role); // Debug line
    console.log('Permissions IDs:', request.permissionsIds); // Debug line

    await this.roleRepo.insertWithPermissions(role, request.permissionsIds);
  }
}