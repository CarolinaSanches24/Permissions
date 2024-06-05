import { Router } from "express";
import { createPermissionController } from "../../useCases/createPermission";

const permissionRouter: Router = Router();

permissionRouter.post("/create", (request, response) => {
  createPermissionController.execute(request, response);
});

export { permissionRouter };