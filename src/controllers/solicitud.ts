import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { actualizarSolicitud, crearSolicitud, eliminarSolicitud, obtenerSolicitudes, obtenerSolicitudesByEstado } from "../services/solicitud";


const postSolicitud =async (req:Request,res:Response) => {
    try {
        const body = req.body;
        const {id} = res.locals.usuario;
        const {ok,respuesta} = await crearSolicitud(body,id);
        res.json({
            ok,
            respuesta
        })
    } catch (error) {
        handleHttp(res,'ERROR_POST_SOLICITUDES');
    }
}

const putSolicitud =async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const {ok,respuesta} = await actualizarSolicitud(body,id);
        res.json({
            ok,
            respuesta
        })
    } catch (error) {
        handleHttp(res,'ERROR_PUT_SOLICITUD');
    }
}

const getSolicitud =async (req:Request,res:Response) => {
    try {

       
        const {
        ok,
        totalEstadoUno,
        totalUno,
        totalEstadoDos,
        totalDos,
        totalEstadoTres,
        totalTres,
        totalEstadoCuatro,
        totalCuatro,
        totalEstadoCinco,
        totalCinco,
        totalEstadoSeis,
        totalSeis,
        totalEstadoSiete,
        totalSiete,
        } = await obtenerSolicitudes();

        res.json({
            ok,
            totalEstadoUno,
            totalUno,
            totalEstadoDos,
            totalDos,
            totalEstadoTres,
            totalTres,
            totalEstadoCuatro,
            totalCuatro,
            totalEstadoCinco,
            totalCinco,
            totalEstadoSeis,
            totalSeis,
            totalEstadoSiete,
            totalSiete
        })
        
    } catch (error) {
        console.log(error)
        handleHttp(res,'ERROR_GET_SOLICITUD');
    }
}

const getSolicitudStatus =async (req:Request,res:Response) => {
    try {

       const {estado} = req.params;
       console.log(estado)
        const {
        ok,
        total,
        status
        } = await obtenerSolicitudesByEstado(estado);

        res.json({
            ok,
            total,
            status
        })
        
    } catch (error) {
        console.log(error)
        handleHttp(res,'ERROR_GET_SOLICITUD_STATUS');
    }
}


const deleteSolicitud =async (req:Request,res:Response) => {
    try {
        
        const {id}=req.params;
        const {ok,respuesta} = await eliminarSolicitud(id);
        res.json({
            ok,
            respuesta
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_SOLICITUD');
    }
}

export {postSolicitud, putSolicitud, getSolicitud,deleteSolicitud,getSolicitudStatus};