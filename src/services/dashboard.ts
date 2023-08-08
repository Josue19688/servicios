import { Op, Sequelize } from "sequelize";
import Agente from "../models/agente";
import Archivo from "../models/archivo";
import Novedad from "../models/novedad";
import Usuario from "../models/usuario";
import Visita from "../models/visita";



const getInfo =async () => {

    //conteo de data
    const [usuario,novedad,visita,archivo] =  await Promise.all([
        Usuario.count(),
        Novedad.count(),
        Visita.count(),
        Archivo.count(),

    ])

    return  {usuario,novedad,visita,archivo};
}


const getDataGeneral =async (inicio:string, final:string) => {
    const [usuario,novedad,visita,archivo,agente] =  await Promise.all([
        Usuario.count({
            where:{
                createdAt:{
                    [Op.between]:[inicio+' 00:00:00',final+' 23:59:59']
                } 
            }
        }),
        Novedad.count({
            where:{
                createdAt:{
                    [Op.between]:[inicio+' 00:00:00',final+' 23:59:59']
                } 
            }
        }),
        Visita.count({
            where:{
                createdAt:{
                    [Op.between]:[inicio+' 00:00:00',final+' 23:59:59']
                } 
            }
        }),
        Archivo.count({
            where:{
                createdAt:{
                    [Op.between]:[inicio+' 00:00:00',final+' 23:59:59']
                } 
            }
        }),
        Agente.count({
            where:{
                createdAt:{
                    [Op.between]:[inicio+' 00:00:00',final+' 23:59:59']
                } 
            }
        })
    ])

    return  {usuario,novedad,visita,archivo, agente};
}

const getGeneralDatos =async () => {
    const [usuario,novedad,visita,archivo,agente] =  await Promise.all([
        Usuario.count(),
        Novedad.count(),
        Visita.count(),
        Archivo.count(),
        Agente.count()
    ])

    return  {usuario,novedad,visita,archivo, agente};
}

const getGroupBy =async (inicio:string, final:string) => {
    const [novedad,visita] =  await Promise.all([
        Novedad.findAll({
            where:{
                createdAt:{
                    [Op.between]:[inicio+' 00:00:00',final+' 23:59:59']
                } 
            },
            group:['tipo'],
            attributes: ['tipo', [Sequelize.fn('COUNT', 'id'), 'count']],
            raw:true,
        }),
        Visita.findAll({
            where:{
                createdAt:{
                    [Op.between]:[inicio+' 00:00:00',final+' 23:59:59']
                } 
            },
            group:['tipo'],
            attributes: ['tipo', [Sequelize.fn('COUNT', 'id'), 'count']],
            raw:true,
        }),
        
    ])

    return  {novedad,visita};
}


export {getInfo,getDataGeneral,getGeneralDatos,getGroupBy}



