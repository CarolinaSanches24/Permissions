import { BaseDomain } from "../../../../services/core/baseDomain";

export interface CreateRoleDTO extends BaseDomain{
    name:string;
    description:string;
    permissionsIds: number[]; 
}

export interface CreateRoleResponseDTO {}