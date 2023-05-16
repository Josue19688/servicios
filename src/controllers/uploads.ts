import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { subirArchivo } from "../utils/subir-archivo";
import Usuario from "../models/usuario";
import Visita from "../models/visita";
import Novedad from "../models/novedad";
import Archivo from "../models/archivo";
import Agente from "../models/agente";



// const cargarArchivo=async(req:Request, res:Response)=>{


//     try {
//         const pathCompleto = await subirArchivo(req.files,[],'usuario');

//         res.json({
//             path:pathCompleto
//         })
        
//     } catch (error) {
//         res.status(400).json({
//             msg:'Error al subir el archivo'
//         });
//     } 

// }

/**
 * NOS SERVIRA PARA VALIDAR Y SUBIR ARCHIVOS DE DIFERENTES MODELOS
 * QUE NECESITEMOS Y ASI EVITAR VOLVER A ESCRIBIR OTRO METODO
 * SOLO DEVEMOS PASARLE LAS COLECCIONES ADMITIDAS
 * 
 * @param {id, coleccion modelos} parametros requeridos 
 * @files {archivo} extenciones adminitdas 
 * @returns modelo
 */


const actualizarImagen=async(req:Request, res:Response)=>{

    const{id, coleccion} = req.params;


    let modelo:any;

    switch (coleccion) {
        case 'usuario':
            modelo=await Usuario.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe usuario con el id :  ${id}`
                })
            }
            
            break;
        case 'visita':
            modelo=await Visita.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
            
            break;
        case 'novedad':
            modelo=await Novedad.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                
            break;
        case 'archivo':
            modelo=await Archivo.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                    
            break;
        case 'agente':
            modelo=await Agente.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                        
            break;
        default:
            return res.status(500).json({
                msg:`Se me olvido olvidar esto`
            })
            break;
    }

    try {

        //TODO: Eliminar imagenes previas

        if(modelo.imagen){
            const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.imagen);
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen);
            }
        }


        const nombre =  await subirArchivo(req.files,undefined,coleccion);
       
        let user;
        switch (coleccion) {
            case 'usuario':
                user = await Usuario.update({
                    imagen:nombre
                },
                {
                    where:{
                        id:id
                    }
                })
                
                break;
            case 'visita':
                user = await Visita.update({
                    imagen:nombre
                },
                {
                    where:{
                        id:id
                    }
                })
                    
                break;
            case 'novedad':
                user = await Novedad.update({
                    imagen:nombre
                },
                {
                    where:{
                        id:id
                    }
                })
                        
                break;
            case 'archivo':
                user = await Archivo.update({
                    imagen:nombre
                },
                {
                    where:{
                        id:id
                    }
                })
                            
                break;
            case 'agente':
                user = await Agente.update({
                    imagen:nombre
                },
                {
                    where:{
                        id:id
                    }
                })
                                
                break;
            default:
                return res.status(500).json({
                    msg:`Se me olvido olvidar esto`
                })
                break;
        }
        
       
        res.json({
            ok:true,
           nombre
        })
    } catch (error) {
        return res.status(400).json({
            msg:'No se pudo subir el archivo'
        });
    }    
    
   
}

const mostrarImagen=async(req:Request, res:Response)=>{

    const{id, coleccion} = req.params;


    let modelo:any;

    switch (coleccion) {
        case 'usuario':
            modelo=await Usuario.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe usuario con el id :  ${id}`
                })
            }
            
            break;
        case 'visita':
            modelo=await Visita.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                
            break;

        case 'novedad':
            modelo=await Novedad.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                    
            break;
        case 'archivo':
            modelo=await Archivo.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                        
            break;
        case 'agente':
            modelo=await Agente.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                            
            break;
        default:
            return res.status(500).json({
                msg:`Se me olvido olvidar esto`
            })
            break;
    }

    try {

       

        if(modelo.imagen){
            const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.imagen);
            if(fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen);
            }
        }
        
        
        const placeholder=path.join(__dirname,'../assets/no-image.jpg');
        return res.sendFile(placeholder);
        

        
        

    } catch (error) {
        return res.status(400).json({
            msg:'No se pudo subir el archivo'
        });
    }

}

const mostrarImagenDos=async(req:Request, res:Response)=>{

    const{id, coleccion,archivo} = req.params;
    

    let modelo:any;

    switch (coleccion) {
        case 'usuario':
            modelo=await Usuario.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe usuario con el id :  ${id}`
                })
            }
            
            break;
        case 'visita':
            modelo=await Visita.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                    
            break;

        case 'novedad':
            modelo=await Novedad.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                        
            break;
        case 'archivo':
            modelo=await Archivo.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                        
            break;
        case 'agente':
            modelo=await Agente.findByPk(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe el registro con el id :  ${id}`
                })
            }
                            
            break;
        default:
            return res.status(500).json({
                msg:`Se me olvido olvidar esto`
            })
            break;
    }

    try {

        if(archivo){
            const pathImagen=path.join(__dirname,'../uploads',coleccion,archivo);
            if(fs.existsSync(pathImagen)){
                return res.sendFile(pathImagen);
            }
        }
        
        const placeholder=path.join(__dirname,'../assets/no-image.jpg');
        return res.sendFile(placeholder);
        

    } catch (error) {
        return res.status(400).json({
            msg:'No se realizo la solicitud.'
        });
    }

}


export {
    actualizarImagen,
    mostrarImagen,
    mostrarImagenDos
};