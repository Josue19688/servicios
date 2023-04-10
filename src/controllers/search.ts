import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handler";
import { buscarTodo, searchColleccion } from "../services/search";


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

export {searchModel,searchModelo};