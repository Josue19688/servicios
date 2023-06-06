import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { buscarTodo, searchColleccion, searchColleccionDate } from "../services/search";


const searchModel=async (req:Request,res:Response) => {
    try {
        const search =  req.params.busqueda;
        const resultado = await buscarTodo(search);
        res.json({
            ok:true,
            resultado
        })
    } catch (error) {
        handleHttp(res,'ERROR_SEARCH_MODELS');
    }
}


const searchModelo =async (req:Request,res:Response) => {
    try {
        const {modelo,busqueda}= req.params;
        
        const resultado=await searchColleccion(modelo,busqueda);
        res.json({
            ok:true,
            resultado
        })
    } catch (error) {
        handleHttp(res,'ERROR_SEARCH_COLLECTION');
    }
}
const searchModelofecha =async (req:Request,res:Response) => {
    try {
        const {modelo}= req.params;
        const {inicio,final,usuario}=req.body;
        
        const resultado=await searchColleccionDate(modelo,inicio,final,usuario);
        res.json({
            ok:true,
            resultado
        })
    } catch (error) {
        handleHttp(res,'ERROR_SEARCH_COLLECTION_REPORTERIA');
    }
}


export {searchModel,searchModelo,searchModelofecha};