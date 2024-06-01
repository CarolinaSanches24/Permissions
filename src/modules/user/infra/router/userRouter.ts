import { Router } from "express";
import { createUserController } from "../../useCases/createUser";

const userRouter: Router = Router();

userRouter.post("/create", (request, response) => {
  createUserController.execute(request, response);
});

export { userRouter };
