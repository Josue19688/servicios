import { NextFunction, Request, Response } from "express";




const validarArchivo = (req:Request, res:Response, next:NextFunction)=>{

    if (!req.files || Object.keys(req.files).length === 0 ) {
        res.status(400).json({
            msg:'No hay archivos.'
        });
        
    }

    next();

}


export {
    validarArchivo
}