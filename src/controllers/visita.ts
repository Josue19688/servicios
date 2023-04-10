import { Request, Response } from "express";
import { actualizarVisita, eliminarVisita, insertarVisita, obtenerVisita, obtenerVisitas } from "../services/visita";
import { handleHttp } from "../utils/error.handler";



const postVisita =async (req:Request,res:Response) => {
    try {
        const body = req.body;
        const {id} = res.locals.usuario;

        const respuesta = await insertarVisita(body,id);
        res.json({
            ok:true,
            respuesta
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_POST_VISITA');
    }
}
const getVisita =async (req:Request,res:Response) => {
    try {
        const {id} =  req.params;
        const visita =  await obtenerVisita(id);
        res.json({
            ok:true,
            visita
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_VISITA');
    }
}

const getVisitas =async (req:Request,res:Response) => {
    try {
        const visitas = await obtenerVisitas();
        res.json({
            ok:true,
            visitas
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_GET_VISITAs');
    }
}

const putVisita =async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const visita  = await actualizarVisita(id,body);
        res.json({
            ok:true,
            visita
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_PUT_VISITA');
    }
}

const deleteVisita =async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const visita = await eliminarVisita(id);
        res.json({
            ok:true,
            visita
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_DELETE_VISITA');
    }
}


export {postVisita,getVisita,getVisitas,putVisita,deleteVisita};