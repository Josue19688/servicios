
import { AgenteInterface } from "../interfaces/agente.interface";
import Agente from "../models/agente";




const crear =async (agente:AgenteInterface,userId:string) => {
    const {
        nombre,
        dpi,
        telefono,
        correo,
        nacimiento,
        direccion,
        igss,
        nit,
        sangre,
        puesto,
        grupo,
        status
       
    } = agente;

    const existeAgente = await Agente.findOne({
        where:{
            dpi:dpi
        }
    })

    if(existeAgente){
        return {ok:false,respuesta:'El Agente ya existe.'};
    }

    const resp = await Agente.create({
        nombre:nombre,
        dpi:dpi,
        telefono:telefono,
        correo:correo,
        nacimiento:nacimiento,
        direccion:direccion,
        igss:igss,
        nit:nit,
        sangre:sangre,
        puesto:puesto,
        grupo:grupo,
        status:status,
        T01UsuarioId:userId
    });

    return {ok:true,respuesta:resp}
}

const actualizar =async (id:string, agente:AgenteInterface) => {
    const {
        nombre,
        dpi,
        telefono,
        correo,
        nacimiento,
        direccion,
        igss,
        nit,
        sangre,
        puesto,
        grupo,
        status,
        imagen,
        licenciaarma,
        licenciavehiculo,
        cv,
        ficha
    } = agente;
    const existeAgente = await Agente.findByPk(id)

    if(!existeAgente){
        return {ok:false,respuesta:'El Agente no  existe.'};
    }

    await Agente.update({
        nombre:nombre,
        dpi:dpi,
        telefono:telefono,
        correo:correo,
        nacimiento:nacimiento,
        direccion:direccion,
        igss:igss,
        nit:nit,
        sangre:sangre,
        puesto:puesto,
        grupo:grupo,
        status:status,
        imagen:imagen,
        licenciaarma:licenciaarma,
        licenciavehiculo:licenciavehiculo,
        cv:cv,
        fich:ficha
    },{
        where:{
            id:id
        }
    })
    const resp =  await Agente.findByPk(id);

    return {ok:true, respuesta:resp};
}

const getAgentes =async () => {
    
    const [
        totalActivos, 
        activos,
        totalSupendidos,
        suspendidos,
        totalVacaciones,
        vacaciones,
        totalBaja,
        baja
    ] = await Promise.all([
        Agente.count({
            where:{
                status:1
            }
        }),
        Agente.findAll({
            where:{
                status:1
            }
        }),
        Agente.count({
            where:{
                status:2
            }
        }),
        Agente.findAll({
            where:{
                status:2
            }
        }),
        Agente.count({
            where:{
                status:3
            }
        }),
        Agente.findAll({
            where:{
                status:3
            }
        }),
        Agente.count({
            where:{
                status:0
            }
        }),
        Agente.findAll({
            where:{
                status:0
            }
        })
    ])

    return {
        ok:true,
        totalActivos, 
        activos,
        totalSupendidos,
        suspendidos,
        totalVacaciones,
        vacaciones,
        totalBaja,
        baja
    };
}


const Agentes =async () => {
    
    
    const agentes = await Agente.findAll({
            where:{
                status:1
            }
        })
       
    return {ok:true,agentes};
}

const eliminar =async (id:string) => {
    const existeAgente = await Agente.findByPk(id);
    if(!existeAgente){
        return {ok:false, respuesta:'No existe el registro.'}
    }

    await Agente.destroy({
        where:{
            id:id
        }
    })

    return {ok:true,respuesta:existeAgente};
}



export {crear, actualizar, getAgentes,eliminar, Agentes};