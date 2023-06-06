
import { SolicitudInterface } from "../interfaces/solicitud.interface";
import Solicitud from "../models/solicitud";



const crearSolicitud =async (solicitud:SolicitudInterface,id:string) => {
    const {
        id_division,
        id_depto,
        id_tipo,
        fecha_opera,
        sede,
        nombre_solicita,
        puesto,
        autoriza,
        ext,
        estado,
        descripcion,
        correo,
        autorizacion,
        asigno,
        fecha_sol,
    }=solicitud;

    const resp = await Solicitud.create({
        id_division:id_division,
        id_depto:id_depto,
        id_tipo:id_tipo,
        fecha_opera:fecha_opera,
        sede:sede,
        nombre_solicita:nombre_solicita,
        puesto:puesto,
        autoriza:autoriza,
        ext:ext,
        estado:estado,
        descripcion:descripcion,
        correo:correo,
        autorizacion:autorizacion,
        asigno:asigno,
        fecha_sol:fecha_sol,
    });

    return {ok:true,respuesta:resp};
    
}

const actualizarSolicitud =async (solicitud:SolicitudInterface,id:string) => {
    const {
        id_division,
        id_depto,
        id_tipo,
        fecha_opera,
        sede,
        nombre_solicita,
        puesto,
        autoriza,
        ext,
        estado,
        descripcion,
        correo,
        autorizacion,
        asigno,
        fecha_sol,
    }=solicitud;


    const existeSolicitud =  await Solicitud.findByPk(id);
    if(!existeSolicitud){
        return {ok:false,respuesta:'La solicitud no  existe.'};
    }

    //T01UsuarioId:id
    await Solicitud.update({
        id_division:id_division,
        id_depto:id_depto,
        id_tipo:id_tipo,
        fecha_opera:fecha_opera,
        sede:sede,
        nombre_solicita:nombre_solicita,
        puesto:puesto,
        autoriza:autoriza,
        ext:ext,
        estado:estado,
        descripcion:descripcion,
        correo:correo,
        autorizacion:autorizacion,
        asigno:asigno,
        fecha_sol:fecha_sol,
       
    },{
        where:{
            id_solicitud:id
        }
    });
    const resp =  await Solicitud.findByPk(id);
    return {ok:true,respuesta:resp};
    
}

const obtenerSolicitudes =async () => {
   
    const [
        totalEstadoUno,
        totalUno,
        totalEstadoDos,
        totalDos,
        totalEstadoTres,
        totalTres,
        totalEstadoCuatro,
        totalCuatro,
        totalEstadoCinco,
        totalCinco,
        totalEstadoSeis,
        totalSeis,
        totalEstadoSiete,
        totalSiete,
    ] = await Promise.all([
        Solicitud.count({
            where:{
                estado:1
            }
        }),
        Solicitud.findAll({
            where:{
                estado:1
            }
        }),
        Solicitud.count({
            where:{
                estado:2
            }
        }),
        Solicitud.findAll({
            where:{
                estado:2
            }
        }),
        Solicitud.count({
            where:{
                estado:3
            }
        }),
        Solicitud.findAll({
            where:{
                estado:3
            }
        }),
        Solicitud.count({
            where:{
                estado:4
            }
        }),
        Solicitud.findAll({
            where:{
                estado:4
            }
        }),
        Solicitud.count({
            where:{
                estado:5
            }
        }),
        Solicitud.findAll({
            where:{
                estado:5
            }
        }),
        Solicitud.count({
            where:{
                estado:6
            }
        }),
        Solicitud.findAll({
            where:{
                estado:6
            }
        }),
        Solicitud.count({
            where:{
                estado:7
            }
        }),
        Solicitud.findAll({
            where:{
                estado:7
            }
        }),
    ])

    return {
        ok:true,
        totalEstadoUno,
        totalUno,
        totalEstadoDos,
        totalDos,
        totalEstadoTres,
        totalTres,
        totalEstadoCuatro,
        totalCuatro,
        totalEstadoCinco,
        totalCinco,
        totalEstadoSeis,
        totalSeis,
        totalEstadoSiete,
        totalSiete
    };
}

const obtenerSolicitudesByEstado =async (estado:string) => {
   
    const [
        total,
        status,
        
    ] = await Promise.all([
        Solicitud.count({
            where:{
                estado:estado
            }
        }),
        Solicitud.findAll({
            where:{
                estado:estado
            }
        }),
    ])

    return {
        ok:true,
       total,
       status
    };
}

const eliminarSolicitud =async (id:string) => {
    const existeSolicitud = await Solicitud.findByPk(id);
    if(!existeSolicitud){
        return {ok:false,respuesta:'No existe el registro.'};
    }

    await Solicitud.destroy({
        where:{
            id_solicitud:id
        }
    });

    return {ok:true,respuesta:existeSolicitud};
}

export {crearSolicitud, actualizarSolicitud, obtenerSolicitudes,eliminarSolicitud,obtenerSolicitudesByEstado};