import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";



export interface AuthInterface{
    correo:string,
    contrasena:string
}

