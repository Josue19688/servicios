import { VisitaInterface } from "../interfaces/visita.interfaz";
import Visita from "../models/visita";

const insertarVisita =async (visita:VisitaInterface,userId:Number) => {
    const {
        tipo,
        dpi,
        colaborador,
        proveniente,
        ingreso,
        salida,
        placa,
        vehiculo
    } = visita;

    const respuesta = await Visita.create({
        tipo:tipo,
        dpi:dpi,
        colaborador:colaborador,
        proveniente:proveniente,
        ingreso:ingreso,
        salida:salida,
        placa:placa,
        vehiculo:vehiculo,
        T01UsuarioId:userId
    });
    return respuesta;
}

const actualizarVisita =async (id:any,visita:VisitaInterface) => {
    const {
        tipo,
        dpi,
        colaborador,
        proveniente,
        ingreso,
        salida,
        placa
    } = visita;

    const existeVisita = await Visita.findByPk(id);
    if(!existeVisita){
        return {ok:false,msg:'El registro no existe!'}
    }
    const respuesta = await Visita.update({
        tipo:tipo,
        dpi:dpi,
        colaborador:colaborador,
        proveniente:proveniente,
        ingreso:ingreso,
        salida:salida,
        placa:placa
    },{
        where:{
            id:id
        }
    });
    return respuesta;
}

const obtenerVisita =async (id:string) => {
    const visita = await Visita.findByPk(id);
    if(!visita){
        return {ok:false,msg:'El registro no existe!'}
    }
    return visita;
}

const obtenerVisitas =async () => {
    const visita = await Visita.findAll();
    if(!visita){
        return {ok:false,msg:'El registro no existe!'}
    }
    return visita;
}

const eliminarVisita = async (id:string) => {
    const visita = await Visita.findByPk(id);
    if(!visita){
        return {ok:false,msg:'El registro no existe!'}
    }

    const eliminado =  await Visita.destroy({
        where:{
            id:id
        }
    })

    return eliminado;
}


export {insertarVisita,actualizarVisita,obtenerVisita,obtenerVisitas,eliminarVisita};