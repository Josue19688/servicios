import {  Request, Response } from "express"
import { actualizarNovedad, eliminarNovedad, insertarNovedad, mostrarNovedad, mostrarNovedades } from "../services/novedad";
import { handleHttp } from "../utils/error.handler"


const getNovedad =async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const novedad = await mostrarNovedad(id);
        res.json({
            ok:true,
            novedad
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_GET_NOVEDAD');
    }
}

const getNovedades =async (req:Request, res:Response) => {
    try {
        const {limite=5,desde=0}=req.query;
        const {total,novedades} = await mostrarNovedades( Number(limite), Number(desde));
        
        res.json({
            ok:true,
            total,
            novedades
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_GET_NOVEDADES');
    }
}

const postNovedad =async (req:Request, res:Response) => {
    try {
        const body =  req.body;
        const {id} = res.locals.usuario;
       
        const insertar = await insertarNovedad(body,id);
        res.json({
            ok:true,
            insertar
        })
    } catch (error) {
        handleHttp(res,'ERROR_POST_NOVEDAD');
    }   
}

const updateNovedad =async (req:Request, res:Response) => {
    try {
        const {id}= req.params;
        const body =  req.body;
        const novedad = await actualizarNovedad(id,body);
        res.json({
            ok:true,
            novedad
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_UPDATE_NOVEDAD');
    }
    
}



const deleteNovedad =async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const novedad = await eliminarNovedad(id);
        res.json({
            ok:true,
            novedad
        })
        
    } catch (error) {
        handleHttp(res,'ERROR_DELETE_NOVEDAD');
    }
}


export {getNovedad,getNovedades,postNovedad,updateNovedad, deleteNovedad};