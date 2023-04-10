
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';

interface JwtPayload {
    id: string

}


export const validarToken = async (req:Request, res:Response, next:any) => {
    
    
    const token =  req.header('x-token');
   

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No tiene autorización'
        })
    }
    
    try {

        const {id} = jwt.verify(token, 'CCdGc1AA12O23') as JwtPayload;

        const usuario = await Usuario.scope('withoutPassword').findByPk(id);
        
        if(!usuario){
            return res.status(401).json({
                ok:false,
                msg:'El usuario no existe'
            })
        }

        const {activo} = usuario?.dataValues;
       
        if(!activo){
            return res.status(401).json({
                ok:false,
                msg:'No tiene autorización para realizar la tarea'
            })
        }
        res.locals.usuario = usuario.dataValues;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token invalido!'
        })
    }


    
}

