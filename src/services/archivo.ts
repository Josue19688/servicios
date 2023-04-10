import { ArchivoInterfaz } from "../interfaces/archivo.interfaz";
import Archivo from "../models/archivo";


const insertarDocumento =async (archivo:ArchivoInterfaz,userId:Number) => {
    const {
        tipo,
        numero,
        fecha,
        origen,
        unidad,
        descripcion
    }=archivo;

    const respuesta = await Archivo.create({
        tipo:tipo,
        numero:numero,
        fecha:fecha,
        origen:origen,
        unidad:unidad,
        descripcion:descripcion,
        T01UsuarioId:userId
    });
    return respuesta;
}

const actualizarDocumento =async (id:string,archivo:ArchivoInterfaz) => {
    const {
        tipo,
        numero,
        fecha,
        origen,
        unidad,
        descripcion
    }=archivo;

    const existeArchivo = await Archivo.findByPk(id);
    if(!existeArchivo){
        return {ok:false,msg:'El registro no existe!'}
    }

    const respuesta = await Archivo.update({
        tipo:tipo,
        numero:numero,
        fecha:fecha,
        origen:origen,
        unidad:unidad,
        descripcion:descripcion
    },{
        where:{
            id:id
        }
    });
    return respuesta;

}

const obtenerArchivo=async (id:string) => {
    const archivo = await Archivo.findByPk(id);
    if(!archivo){
        return {ok:false,msg:'El registro no existe!'}
    }

    return archivo;
}


const obtenerArchivos=async () => {
    const archivo = await Archivo.findAll();
    if(!archivo){
        return {ok:false,msg:'El registro no existe!'}
    }

    return archivo;
}

const eliminarArchivo = async (id:string) => {
    const archivo = await Archivo.findByPk(id);
    if(!archivo){
        return {ok:false,msg:'El registro no existe!'}
    }

    const eliminado =  await Archivo.destroy({
        where:{
            id:id
        }
    })

    return eliminado;
}


export {insertarDocumento, actualizarDocumento,obtenerArchivo,obtenerArchivos,eliminarArchivo};