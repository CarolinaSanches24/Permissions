import { BaseDomain } from "../../../../services/core/baseDomain";

export interface CreatePermissionDTO extends BaseDomain{
    name:string;
    description:string;
}

export interface CreatePermissionResponseDTO {
    id: number;
    pid:string;
}