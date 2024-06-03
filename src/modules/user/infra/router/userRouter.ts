import { Router } from "express";
import { createUserController } from "../../useCases/createUser";
import { updateUserController } from "../../useCases/updateUser";
import { sessionUserController } from "../../useCases/sessionUser";

const userRouter: Router = Router();

userRouter.post("/create", (request, response) => {
  createUserController.execute(request, response);
});

userRouter.post("/session", (request, response)=> {
   sessionUserController.execute(request, response);
});

userRouter.put("/update/:id", (request, response) => {
  updateUserController.execute(request, response);
});

export { userRouter };
