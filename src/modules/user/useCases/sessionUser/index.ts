import { userRepo } from "../../repo/userRepo";
import { SessionUserController } from "./sessionUserController";
import { SessionUserUseCase } from "./sessionUserUseCase";

const sessionUserUseCase = new SessionUserUseCase(userRepo);
const sessionUserController = new SessionUserController(sessionUserUseCase);

export {sessionUserController, sessionUserUseCase};