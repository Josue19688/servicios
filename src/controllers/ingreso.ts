import {  Request, Response } from "express"
import { handleHttp } from "../utils/error.handler";
import { actualizarRegistro, eliminarRegistro, getRegistros, insertarRegistro } from "../services/ingreso";



const crear=async (req:Request,res:Response) => {
    try {
        const body = req.body;
        const {id} = res.locals.usuario;
        const {ok,msg} = await insertarRegistro(body,id);
    
        res.json({
            ok,
            msg,
        })
    } catch (error) {
        handleHttp(res,'ERROR_CREAR_REGISTROS');
    }
}


const actualizar=async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const body =  req.body;
        const respuesta = await actualizarRegistro(id, body);
    
        res.json({
            ok:true,
            respuesta
        })
    } catch (error) {
        handleHttp(res,'ERROR_ACTUALIZAR_REGISTROS');
    }
}

const obtenerRegistros = async (req:Request,res:Response) => {
    try {
        
        const {total,ingresos} = await getRegistros()
    
        res.json({
            ok:true,
            total,
            ingresos
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_REGISTROS');
    }
}


const eliminarRegistros = async (req:Request,res:Response) => {
    try {
        const {id} =req.params;
        const respuesta = await eliminarRegistro(id);
    
        res.json({
            ok:true,
            respuesta
        })
    } catch (error) {
        handleHttp(res,'ERROR_DELETE_REGISTROS');
    }
}
export {crear,actualizar,obtenerRegistros,eliminarRegistros}

