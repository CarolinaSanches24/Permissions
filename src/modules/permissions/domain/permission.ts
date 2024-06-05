import { BaseDomain } from "../../../services/core/baseDomain";

export interface Permission extends BaseDomain{
    name:string;
    description:string;
}