import { BaseDomain } from "../../../services/core/baseDomain";

export interface User extends BaseDomain{
   email:string;
   password:string;
   roleId:number;
   phone:string;
}