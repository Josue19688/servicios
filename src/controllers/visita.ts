import { Request, Response } from "express";
import { actualizarVisita, eliminarVisita, insertarVisita,  obtenerVisitas, obtenerVisitasSocket, visitaUser } from "../services/visita";
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


const getVisitas =async (req:Request,res:Response) => {
    try {
        const {limite=5,desde=0} = req.query;
        const {total,visitas} = await obtenerVisitas( );
        res.json({
            ok:true,
            total,
            visitas
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_GET_VISITAs');
    }
}

const getVisitasSockets =async (req:Request,res:Response) => {
    try {
        const {total,visitas} = await obtenerVisitasSocket( );
        res.json({
            ok:true,
            total,
            visitas
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_GET_VISITAs');
    }
}

const visitasUsuarios = async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const {total, visitas} = await visitaUser(id);
        res.json({
            ok:true,
            total,
            visitas
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_VISITAS_USER')
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


export {postVisita,getVisitas,putVisita,deleteVisita,visitasUsuarios,getVisitasSockets};