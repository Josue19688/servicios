import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { actualizar, eliminar, insertar, obtenerRegistros } from "../services/vehiculo";


const crear =async (req:Request, res:Response) => {
    try {
        const body =  req.body;
        const {id}=res.locals.usuario;
        const {ok,msg}= await insertar(body,id);
        res.json({
            ok,
            msg,
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_CREAR_MOVIMIENTO_VEHICULO');
    }
}

const update = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const body =  req.body;
        const {ok,msg} = await actualizar(id,body);
        res.json({
            ok,
            msg
        })
    } catch (error) {
        handleHttp(res,'ERROR_ACTUALIZAR_MOVIMIENTO_VEHICULO');
    }
}

const obtenerRegistro= async (req:Request, res:Response) => {
    try {
        const {total,registros} = await obtenerRegistros();
        res.json({
            ok:true,
            total,
            registros
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_MOVIMIENTO_VEHICULO');
    }
}

const deleteRegistro= async (req:Request, res:Response) => {
    try {
        const {id} =req.params;
        const {ok,msg} = await eliminar(id);
    
        res.json({
            ok,
            msg
        })
    } catch (error) {
        handleHttp(res,'ERROR_ELIMINAR_MOVIMIENTO_VEHICULO');
    }
}

export {crear, update,obtenerRegistro,deleteRegistro};