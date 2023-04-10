import { Request, Response } from "express";
import { loginUsuario } from "../services/auth";

import { handleHttp } from "../utils/error.handler";
import generarJWT from "../utils/generarJWT";


const login=async (req:Request,res:Response) => {
    try {
        const body=req.body;
        const response = await loginUsuario(body);
        res.json({
            response
        })
    } catch (error) {
        handleHttp(res,'ERROR_LOGIN_USER');
    }
}

const renovarToken = async(req:Request,res:Response)=>{

    try {
        const usuario = res.locals.usuario;

        
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_RENOVAR_TOKEN');
    }
    
}



export {login,renovarToken};