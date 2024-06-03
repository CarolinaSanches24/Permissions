export interface  SessionUserDTO{
    email:string;
    password:string;
}

export interface SessionUserResponseDTO{
    token:string;
    expiresIn: number;
    expireDate: number;
}