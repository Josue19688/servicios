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



export {getInfo}



