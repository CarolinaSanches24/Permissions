import { BaseDomain } from "../../../../services/core/baseDomain";

export interface CreateUserDTO extends BaseDomain{
    email:string;
    password:string;
    phone:string;
}
