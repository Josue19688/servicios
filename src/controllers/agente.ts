import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { actualizar, crear, eliminar, getAgentes } from "../services/agente";

const crearAgente =async (req:Request,res:Response) => {
    try {
        const body = req.body;
        console.log(body);
        const {id} = res.locals.usuario;
        const {ok,respuesta} = await crear(body,id);
        res.json({
            ok,
            respuesta
        })
    } catch (error) {
        handleHttp(res,'ERROR_POST_AGENTE');
    }
}

const updateAgente =async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const {ok, respuesta} = await actualizar(id,body);
        res.json({
            ok,
            respuesta
        })
    } catch (error) {
        handleHttp(res,'ERROR_UPDATE_AGENTE');
    }
}

const obtenerAgente =async (req:Request,res:Response) => {
    try {
        const {ok,totalActivos, 
            activos,
            totalSupendidos,
            suspendidos,
            totalVacaciones,
            vacaciones,
            totalBaja,
            baja} = await getAgentes();

        res.json({
            ok,
            totalActivos, 
            activos,
            totalSupendidos,
            suspendidos,
            totalVacaciones,
            vacaciones,
            totalBaja,
            baja
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_AGENTE');
    }
}

const eliminarAgente =async (req:Request,res:Response) => {
    try {
        const {id}=req.params;
        const {ok,respuesta} = await eliminar(id);
        res.json({
            ok,
            respuesta
        })
    } catch (error) {
        handleHttp(res,'ERROR_DELETE_AGENTE');
    }
}


export {crearAgente,updateAgente,obtenerAgente,eliminarAgente}