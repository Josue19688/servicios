
import path from "path";
import {v4 as uuidv4} from 'uuid';



const subirArchivo=(files:any, extencionesValidas=['png','jpg','jpeg','gif'],carpeta='')=>{


    return new Promise((resolve, reject)=>{


       

        const {archivo} = files;

       

        const nombreCortado= archivo.name.split('.');
        const extencion=nombreCortado[nombreCortado.length-1];
    
    
        //TODO: validar extenciones
       
        if(!extencionesValidas.includes(extencion)){
            return reject(`La extesión ${extencion} no es válida`);
            
        }
        
        const nombreTemporal=uuidv4()+'.'+extencion;

        const uploadPath =path.join( __dirname,'../uploads/',carpeta,nombreTemporal);

        archivo.mv(uploadPath, (err:any)=> {
            if (err) {
            return reject(err);
            }
            resolve(`${nombreTemporal}`);
           
        });
    });
    
   

    
}


export {subirArchivo};