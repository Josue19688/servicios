import { Op } from "sequelize";
import Usuario from "../models/usuario";
import Novedad from "../models/novedad";
import Visita from "../models/visita";
import Archivo from "../models/archivo";





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
        default:
            return {ok:false,msg:'Collecion no encontrada'};
    }

    return data;
}

export {buscarTodo,searchColleccion};