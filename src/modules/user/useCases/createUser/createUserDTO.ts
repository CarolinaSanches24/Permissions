import { BaseDomain } from "../../../../services/core/baseDomain";

export interface CreateUserDTO extends BaseDomain {
  email: string;
  password: string;
  phone: string;
  roleId?: number;
}

export interface CreateUserResponseDTO {
  id: number;
  pid:string;
}
