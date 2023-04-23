import {  Request, Response } from "express"
import { handleHttp } from "../utils/error.handler";
import { getInfo } from "../services/dashboard";


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


export {getData};