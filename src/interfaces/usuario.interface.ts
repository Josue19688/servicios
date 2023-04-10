import { AuthInterface } from "./auth";


export interface UsuarioInterface extends AuthInterface{
    nombre:string,
    activo:boolean,
    imagen?:string,
    token?:string,
    unidad:string,
    rol:string
}