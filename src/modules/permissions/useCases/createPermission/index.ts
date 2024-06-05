import { permissionRepo } from "../../repo/permissionRepo";
import { CreatePermissionController } from "./createPermissionController";
import { CreatePermissionUseCase } from "./createPermissionUseCase";

const createPermissionUseCase = new CreatePermissionUseCase(permissionRepo);
const createPermissionController = new CreatePermissionController(
  createPermissionUseCase
);

export { createPermissionController, createPermissionUseCase };
