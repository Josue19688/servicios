import { IngresoInterface } from "../interfaces/ingreso.interface";
import Ingreso from "../models/ingresos";
import  sequelize  from 'sequelize';





const insertarRegistro =async (ingreso:IngresoInterface,userId:Number) => {

    const {
        codigo,
        status
    } = ingreso;
    
   

    const registro =  await Ingreso.findAll({
        attributes:[[sequelize.fn('max', sequelize.col('id')),'max']],
        raw:true,
        where:{
            codigo:codigo,
            status:true
        }
    })

    let resultado:any = registro[0];
    let maximo =resultado.max;

    if(maximo>0 || maximo!==null){
        return {ok:false,msg:`El codigo ${codigo} tiene pendiente un registro`}
    }
    

    const respuesta =  await Ingreso.create({
        codigo:codigo,
        status:status,
        T01UsuarioId:userId
    });
    return {ok:true,msg:respuesta};
}


const actualizarRegistro =async (id:string, body:IngresoInterface) => {
    
    
    const existeIngreso = await Ingreso.findByPk(id);
    if(!existeIngreso){
        return {ok:false,msg:'El registro no existe!'}
    }


    const respuesta = await Ingreso.update({
        status:false
    },{
        where:{
            id:id
        }
    })
    return respuesta;
}


const eliminarRegistro =async (id:string) => {
    const existeIngreso = await Ingreso.findByPk(id);
    if(!existeIngreso){
        return {ok:false,msg:'El registro no existe!'}
    }

    const respuesta =  await Ingreso.destroy({
        where:{
            id:id
        }
    });

    return respuesta;
}

const getRegistros = async () => {
    const status = true;

    const [total,ingresos] = await Promise.all([
        Ingreso.count(
            {
                where:{
                    status :status
                }
            }
        ),
        Ingreso.findAll({
            where:{
                status :status
            }
        })
    ])

    return {total, ingresos};

}


export {insertarRegistro,actualizarRegistro,getRegistros,eliminarRegistro}