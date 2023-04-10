import { NextFunction, Request, Response } from "express";


const esAdminRol=(req:Request, res:Response,next:NextFunction)=>{


    if(!res.locals.usuario){
        return res.status(500).json({
            ok:false,
            msg:'El rol no es válido'
        })
    }

    const {rol, nombre} = res.locals.usuario;

    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            ok:false,
            msg:`${nombre}, No tiene autorización para realizar la acción`
        })
    }

    next();
}

const tieneRol=(...roles:any)=>{

    return (req:Request, res:Response,next:NextFunction)=>{

        if(!res.locals.usuario){
            return res.status(500).json({
                ok:false,
                msg:'El rol no es válido'
            })
        }

        if(!roles.includes(res.locals.usuario.rol)){
            return res.status(401).json({
                ok:false,
                msg:'El rol no tiene permisos para realizar acciones'
            })
        }

        next();
    }
}
export {
    esAdminRol,
    tieneRol
}