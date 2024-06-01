import { Router } from "express";
import { createUserController } from "../../useCases/createUser";
import { updateUserController } from "../../useCases/updateUser";

const userRouter: Router = Router();

userRouter.post("/create", (request, response) => {
  createUserController.execute(request, response);
});

userRouter.put("/update/:id", (request, response) => {
  updateUserController.execute(request, response);
});

export { userRouter };
