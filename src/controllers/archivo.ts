import { Request, Response } from "express";
import { actualizarDocumento, eliminarArchivo, insertarDocumento, obtenerArchivo, obtenerArchivos } from "../services/archivo";
import { handleHttp } from "../utils/error.handler";




const postArchivo =async (req:Request,res:Response) => {
    try {

        const body = req.body;
        const {id} = res.locals.usuario;
        const archivo = await insertarDocumento(body,id);
        res.json({
            ok:true,
            archivo
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_POST_ARCHIVO');
    }
}

const putArchivo =async (req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const archivo = await actualizarDocumento(id,body);
        res.json({
            ok:true,
            archivo
        })
    } catch (error) {
        handleHttp(res,'ERROR_PUT_ARCHIVO');
    }
}

const getArchivo =async (req:Request,res:Response) => {
    try {
        const {id}= req.params;
        const archivo = await obtenerArchivo(id);
        res.json({
            ok:true,
            archivo
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_GET_ARCHIVO');
    }
}

const getArchivos =async (req:Request,res:Response) => {
    try {
        const archivo = await obtenerArchivos();
        res.json({
            ok:true,
            archivo
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_GET_ARCHIVOS');
    }
}

const deleteArchivo =async (req:Request,res:Response) => {
    try {
        const {id}=req.params;
        const archivo = await eliminarArchivo(id);
        res.json({
            ok:true,
            archivo
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_DELETE_ARCHIVO');
    }
}

export {postArchivo,putArchivo,getArchivo,getArchivos,deleteArchivo};