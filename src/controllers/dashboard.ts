import {  Request, Response } from "express"
import { handleHttp } from "../utils/error.handler";
import { getDataGeneral, getGeneralDatos, getGroupBy, getInfo } from "../services/dashboard";


const getData =async (req:Request, res:Response) => {
    try {
        const {usuario,novedad,visita,archivo} = await getInfo();
        res.json({
            ok:true,
            usuario,
            novedad,
            visita,
            archivo
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_CONTEO');
    }
}

const getGeneral =async (req:Request,res:Response) => {
    try {
        const {inicio,final}=req.params;
       
       
        const {usuario,novedad,visita,archivo, agente} = await getDataGeneral(inicio, final);
        res.json({
            usuario,
            novedad,
            visita,
            archivo,
            agente
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_DATA_GENERAL');
    }
}


const getGeneralData =async (req:Request,res:Response) => {
    try {
       
        const {usuario,novedad,visita,archivo, agente} = await getGeneralDatos();
        res.json({
            usuario,
            novedad,
            visita,
            archivo,
            agente
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_DATA_GENERAL');
    }
}

const getGroup =async (req:Request,res:Response) => {
    try {
        const {inicio,final}=req.params;
       
        const {novedad,visita} = await getGroupBy(inicio,final);
        res.json({
            novedad,
            visita
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_DATA_GROUP');
    }
}

export {getData,getGeneral,getGeneralData,getGroup};