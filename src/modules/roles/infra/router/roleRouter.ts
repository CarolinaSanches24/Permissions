import { Router } from "express";
import { createRoleController } from "../../useCases/createRole";

const roleRouter: Router = Router();

roleRouter.post("/create", (request, response) => {
  createRoleController.execute(request, response);
});

export { roleRouter };