import { permissionRepo } from "../../../permissions/repo/permissionRepo";
import { roleRepo } from "../../repo/roleRepo";
import { CreateRoleController } from "./createRoleController";
import { CreateRoleUseCase } from "./createRoleUseCase";

const createRoleUseCase = new CreateRoleUseCase(roleRepo, permissionRepo);
const createRoleController = new CreateRoleController(
  createRoleUseCase
);

export { createRoleController, createRoleUseCase };