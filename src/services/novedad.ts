

import { NovedadInterface } from "../interfaces/novedad.interface";
import { botLogs } from "../middlewares/log";
import Novedad from "../models/novedad";


const insertarNovedad =async (novedad:NovedadInterface,userId:Number) => {

    const {
        tipo,
        nombres,
        placa,
        vehiculo,
        hora,
        fecha,
        puesto,
        preliminar,
        descripcion,
    } = novedad;

    const data =`Tipo Novedad : ${tipo}, \nNombres : ${nombres}, \nPlacas : ${placa},\nHora :${hora},\nFecha : ${fecha},\nPuesto : ${puesto},\nPreliminar : ${preliminar},\nDescripcion:${descripcion}`;
    
    botLogs(data);
    

    const respuesta =  await Novedad.create({
        tipo:tipo,
        nombres:nombres,
        placa:placa,
        vehiculo:vehiculo,
        hora:hora,
        fecha:fecha,
        puesto:puesto,
        preliminar:preliminar,
        descripcion:descripcion,
        T01UsuarioId:userId
    });
    return respuesta;
}

const actualizarNovedad =async (id:any,novedad:NovedadInterface) => {
    const {
        tipo,
        nombres,
        placa,
        vehiculo,
        hora,
        fecha,
        puesto,
        preliminar,
        descripcion,
    } = novedad;

    const existeNovedad = await Novedad.findByPk(id);
    if(!existeNovedad){
        return {ok:false,msg:'El registro no existe!'}
    }

    const respuesta = await Novedad.update({
        tipo:tipo,
        nombres:nombres,
        placa:placa,
        vehiculo:vehiculo,
        hora:hora,
        fecha:fecha,
        puesto:puesto,
        preliminar:preliminar,
        descripcion:descripcion
    },{
        where:{
            id:id
        }
    })
    return respuesta;
}


const mostrarNovedad =async (id:string) => {
    const novedad = await Novedad.findByPk(id);
    if(!novedad){
        return {ok:false,msg:'El registro no existe!'}
    }

    return novedad;
}

const mostrarNovedades =async () => {
    
    
    const novedades =  await Novedad.findAll({
        order:[
            ['id','DESC']
        ],
    });

   
    const total = await Novedad.count();
    return {total,novedades};
}

const eliminarNovedad = async (id:string) => {
    const novedad = await Novedad.findByPk(id);
    if(!novedad){
        return {ok:false,msg:'El registro no existe!'}
    }

    const eliminado =  await Novedad.destroy({
        where:{
            id:id
        }
    })

    return eliminado;
}

export {insertarNovedad, actualizarNovedad,mostrarNovedad,mostrarNovedades,eliminarNovedad}