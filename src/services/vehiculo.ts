import sequelize from "sequelize";
import { VehiculoInterface } from "../interfaces/vehiculo.interface";
import Vehiculo from "../models/vehiculo";

const insertar =async (data:VehiculoInterface,userId:Number) => {
    
    const {
       
        piloto,
        vehiculo,
        kmsalida,
        csalida,
        sede
    } = data;

    /**
     * Verificar el maximo registro con el vehiculo 
     */

    const registro = await Vehiculo.findAll({
        attributes:[[sequelize.fn('max', sequelize.col('id')),'max']],
        raw:true,
        where:{
            vehiculo:vehiculo,
            status:true
        }
    });

    let resultado:any = registro[0];
    let maximo =resultado.max;

    if(maximo>0 || maximo!==null){
        return {ok:false,msg:`El vehiculo ${vehiculo} tiene pendiente un registro`}
    }

    const respuesta = await Vehiculo.create({
        piloto:piloto,
        vehiculo:vehiculo,
        kmsalida:kmsalida,
        status:true,
        csalida:csalida,
        sede:sede,
        T01UsuarioId:userId
    });

    return {ok:true,msg:respuesta};

}

const actualizar =async (id:string,data:VehiculoInterface) => {
    
    const registro =  await Vehiculo.findByPk(id);
    if(!registro){
        return {ok:false,msg:'El registro no existe!'}
    }

    const {
        kmingreso,
        cingreso,
        sede
    } = data;

    const respuesta = await Vehiculo.update({
        kmingreso:kmingreso,
        status:false,
        cingreso:cingreso,
        sede:sede
    },{
        where:{
            id:id
        }
    });

    return {ok:true,msg:respuesta};
}

const eliminar =async (id:string) => {
    const registro = await Vehiculo.findByPk(id);
    if(!registro){
        return {ok:false,msg:'El registro no existe.'};
    }

    const respuesta = await Vehiculo.destroy({
        where:{
            id:id
        }
    });

    return {ok:true, msg:registro};
}

const obtenerRegistros =async () => {
    const status =true;

    const [total, registros] =  await Promise.all([
        Vehiculo.count(
            {
                where:{
                    status :status
                }
            }
        ),
        Vehiculo.findAll({
            where:{
                status :status
            }
        })
    ]);

    return {total, registros};
}


export {insertar,actualizar,eliminar,obtenerRegistros};