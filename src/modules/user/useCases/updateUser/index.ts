import { userRepo } from "../../repo/userRepo";
import { UpdateUserUseCase } from "./updateUseCase";
import { UpdateUserController } from "./updateUserController";

const updateUserUseCase = new UpdateUserUseCase(userRepo);
const updateUserController = new UpdateUserController(updateUserUseCase);

export {updateUserController, updateUserUseCase};