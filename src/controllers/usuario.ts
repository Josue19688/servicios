import {  Request, Response } from "express"
import { actualizarUsuario, eliminarUsuario, insertarUsuario, mostrarUsuario, mostrarUsuarios} from "../services/usuario";
import { handleHttp } from "../utils/error.handler"



const getUsuario=async(req:Request, res:Response)=>{
    try {
        const {id} = req.params;
        const usuario = await mostrarUsuario(id);
        res.json({
            ok:true,
            usuario
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_USUARIO');
    }
}

const getUsuarios=async(req:Request, res:Response)=>{
    try {
        
        const {limite=5,desde=0}=req.query;
        const {total ,usuarios} = await mostrarUsuarios( Number(limite), Number(desde));
       
        res.json({
            ok:true,
            total,
            usuarios
        })
    } catch (error) {
        handleHttp(res,'ERROR_GET_USUARIOS');
    }
}

const postUsuario=async(req:Request, res:Response)=>{
    try {
        const body = req.body;
        const insertar = await insertarUsuario(body);
        res.json({
            ok:true,
            insertar
        })
        
    } catch (error) {
        console.log(error)
        handleHttp(res,'ERROR_POST_USUARIO');
    }
}

const updateUsuario = async(req:Request, res:Response)=>{
    try {
        const {id}= req.params;
        const body = req.body;
        const {usuario } = await actualizarUsuario(id,body);
        res.json({
            ok:true,
            usuario
        })
    } catch (error) {
        handleHttp(res,'ERROR_PUT_USUARIO');
    }
}

const deleteUsuario=async(req:Request, res:Response)=>{
    try {
        const {id}= req.params;
       
        const deleteUsuario = await eliminarUsuario(id);
        res.json({
            ok:true,
            msg:'Registro eliminado',
            deleteUsuario
        })
    } catch (error) {
        handleHttp(res,'ERROR_DELETE_USUARIO');
    }
}


export {getUsuario, getUsuarios,postUsuario,updateUsuario,deleteUsuario};