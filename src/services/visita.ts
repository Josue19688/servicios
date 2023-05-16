import { VisitaInterface } from "../interfaces/visita.interfaz";
import Usuario from "../models/usuario";
import Visita from "../models/visita";

const insertarVisita =async (visita:VisitaInterface,userId:Number) => {
    const {
        tipo,
        puesto,
        nombre,
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
        puesto:puesto,
        nombre:nombre,
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
        puesto,
        nombre,
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
        puesto:puesto,
        nombre:nombre,
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


//TODO: OBTENET VISITAS POR ID DEL USUARIO

const visitaUser = async (id:string) => {
    const visitas  =  await Visita.findAll({
        where:{
            T01UsuarioId:id
        }
         
    })

    const total = await Visita.count({
        where:{
            T01UsuarioId:id
        }
    });
    return {total,visitas};

}

const obtenerVisitas =async (limite:number,desde:number) => {
    const visitas = await Visita.findAll({
        order:[
            ['id','DESC']
        ],
        offset:desde,
        limit:limite
    });
    if(!visitas){
        return {ok:false,msg:'El registro no existe!'}
    }

    const total = await Visita.count();
    return {total,visitas};
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


export {insertarVisita,actualizarVisita,obtenerVisitas,eliminarVisita,visitaUser};