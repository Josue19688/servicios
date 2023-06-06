import model from "sequelize/types/model";
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
        fecha,
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
        fecha:fecha,
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
        fecha,
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
        fecha:fecha,
        ingreso:ingreso,
        salida:salida,
        placa:placa,
        estado:false
    },{
        where:{
            id:id
        }
    });
    return respuesta;
}



const actualizarVisitaSocket =async (id:any,visita:VisitaInterface) => {
    const {
        tipo,
        puesto,
        nombre,
        dpi,
        colaborador,
        proveniente,
        fecha,
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
        fecha:fecha,
        ingreso:ingreso,
        salida:salida,
        placa:placa,
        estado:false
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

const obtenerVisitas =async () => {

    const visitas = await Visita.findAll({
        order:[
            ['id','DESC']
        ],
        
    });
    if(!visitas){
        return {ok:false,msg:'El registro no existe!'}
    }

    const total = await Visita.count();
    return {total,visitas};
}

const obtenerVisitasSocket =async () => {
    const visitas = await Visita.findAll({
        order:[
            ['id','DESC']
        ],
        where:{
            estado:true
        }
        
    });
    if(!visitas){
        return {ok:false,msg:'El registro no existe!'}
    }

    const total = await Visita.count({
        where:{
            estado:true
        }
    });
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


export {insertarVisita,actualizarVisita,obtenerVisitas,eliminarVisita,visitaUser,actualizarVisitaSocket,obtenerVisitasSocket};