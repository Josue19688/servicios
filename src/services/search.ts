import { Op } from "sequelize";
import Usuario from "../models/usuario";
import Novedad from "../models/novedad";
import Visita from "../models/visita";
import Archivo from "../models/archivo";
import Ingreso from "../models/ingresos";
import Vehiculo from "../models/vehiculo";





const buscarTodo=async (palabra:string) => {
   
    const [usuario,novedad,visita,archivo] =  await Promise.all([
        Usuario.scope('withoutPassword').findAll({
            where:{
                nombre:{
                    [Op.like]: `%${palabra}%`
                }
            }
        }),
        Novedad.findAll({
            where:{
                tipo:{
                    [Op.like]: `%${palabra}%`
                }
            }
        }),
        Visita.findAll({
            where:{
                tipo:{
                    [Op.like]: `%${palabra}%`
                }
            }
        }),
        Archivo.findAll({
            where:{
                tipo:{
                    [Op.like]: `%${palabra}%`
                }
            }
        })

    ])

    return  {usuario,novedad,visita,archivo};
}

const searchColleccion = async (colleccion:string,search:string) => {
    let data:any[] = [];

    switch(colleccion){
        case 'usuario':
            data = await Usuario.scope('withoutPassword').findAll({
                where:{
                    nombre:{
                        [Op.like]: `%${search}%`
                    }
                }
            })
           
            break;
        case 'novedad':
            data=await Novedad.findAll({
                where:{
                    tipo:{
                        [Op.like]: `%${search}%`
                    }
                },
            })
            break;
        case 'visita':
            data=await Visita.findAll({
                where:{
                    tipo:{
                        [Op.like]: `%${search}%`
                    }
                },
            })
            break;
        case 'archivo':
            data=await Archivo.findAll({
                where:{
                    tipo:{
                        [Op.like]: `%${search}%`
                    }
                },
            })
            break;
        case 'ingreso':
            data=await Ingreso.findAll({
                where:{
                    codigo:{
                        [Op.like]: `%${search}%`
                    },
                    status:true
                },
            })
            break;
        case 'vehiculo':
            data=await Vehiculo.findAll({
                where:{
                    vehiculo:{
                        [Op.like]: `%${search}%`
                    },
                    status:true
                },
            })
            break;
        default:
            return {ok:false,msg:'Collecion no encontrada'};
    }

    return data;
}

 
/**
 * Busqueda para reporteria mandandole fechas y por usuario
 * @param colleccion 
 * @param fechainicial 
 * @param fechafinal 
 * @param id 
 * @returns coleccion de modelos
 */
const searchColleccionDate = async (colleccion:string,fechainicial:any, fechafinal:any,id:any) => {
    let data:any[] = [];

    switch(colleccion){
        case 'usuario':
            data = await Usuario.scope('withoutPassword').findAll({
                where:{
                    createdAt:{
                        [Op.between]:[fechainicial+' 00:00:00',fechafinal+' 23:59:59']
                    },
                    T01UsuarioId:`${id}`
                }
            })
           
            break;
        case 'novedad':
            data=await Novedad.findAll({
                where:{
                    createdAt:{
                        [Op.and]: [
                            {
                                [Op.gt]: new Date(fechainicial).toISOString(),
                                [Op.lt]: new Date(`${fechafinal} 23:59:59`).toISOString(),
                              
                            }
                        ]
                    },
                    T01UsuarioId:`${id}`
                }
            });
            break;
        case 'visita':
            data=await Visita.findAll({
                where:{
                    createdAt:{
                        [Op.between]:[fechainicial+' 00:00:00',fechafinal+' 23:59:59']
                    },
                    T01UsuarioId:`${id}`
                }
            })
            break;
        case 'archivo':
            data=await Archivo.findAll({
                where:{
                    createdAt:{
                        [Op.between]:[fechainicial+' 00:00:00',fechafinal+' 23:59:59']
                    },
                    T01UsuarioId:`${id}`
                },
                
            })
            break;
        case 'ingreso':
            data=await Ingreso.findAll({
                where:{
                    createdAt:{
                        [Op.between]:[fechainicial+' 00:00:00',fechafinal+' 23:59:59']
                    },
                    T01UsuarioId:`${id}` 
                }
            })
            break;
        case 'vehiculo':
            data=await Vehiculo.findAll({
                where:{
                    createdAt:{
                        [Op.between]:[fechainicial+' 00:00:00',fechafinal+' 23:59:59']
                    },
                    T01UsuarioId:`${id}` 
                }
            })
            break;
        default:
            return {ok:false,msg:'Collecion no encontrada'};
    }

    
    return data;
}

/**
 * Busqueda general solo para el departamento de seguridad pueda crear sus reportes
 * @param colleccion 
 * @param fechainicial 
 * @param fechafinal 
 * @returns Coleccion de modelos 
 */
const searchColleccionDateGeneral = async (colleccion:string,fechainicial:any, fechafinal:any) => {
    let data:any[] = [];

    switch(colleccion){
        case 'usuario':
            data = await Usuario.scope('withoutPassword').findAll({
                where:{
                    createdAt:{
                        [Op.between]:[fechainicial+' 00:00:00',fechafinal+' 23:59:59']
                    } 
                }
            })
           
            break;
        case 'novedad':
            data=await Novedad.findAll({
                where:{
                    createdAt:{
                        [Op.and]: [
                            {
                                [Op.gt]: new Date(fechainicial).toISOString(),
                                [Op.lt]: new Date(`${fechafinal} 23:59:59`).toISOString(),
                              
                            }
                        ]
                    } 
                }
            });
            break;
        case 'visita':
            data=await Visita.findAll({
                where:{
                    createdAt:{
                        [Op.between]:[fechainicial+' 00:00:00',fechafinal+' 23:59:59']
                    },
                   
                }
            })
            break;
        case 'archivo':
            data=await Archivo.findAll({
                where:{
                    createdAt:{
                        [Op.between]:[fechainicial+' 00:00:00',fechafinal+' 23:59:59']
                    } 
                }
            })
            break;
        case 'ingreso':
            data=await Ingreso.findAll({
                where:{
                    createdAt:{
                        [Op.between]:[fechainicial+' 00:00:00',fechafinal+' 23:59:59']
                    } 
                }
            })
            break;
        case 'vehiculo':
            data=await Vehiculo.findAll({
                where:{
                    createdAt:{
                        [Op.between]:[fechainicial+' 00:00:00',fechafinal+' 23:59:59']
                    } 
                }
            })
            break;
        default:
            return {ok:false,msg:'Collecion no encontrada'};
    }

    
    return data;
}
export {buscarTodo,searchColleccion,searchColleccionDate,searchColleccionDateGeneral};