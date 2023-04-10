// const Usuario = require('../models/usuarios.models');
// const Role = require('../models/rol.models');

import Rol from "../models/rol";
import Usuario from "../models/usuario";

const esRoleValido= async(rol='')=>{
    const existeRol= await Rol.findOne({
        where:{
            rol:rol
        }
    });
    if(!existeRol){
        throw new Error(`El rol ${rol} no es válido.`);
    }
}

const existeEmail=async(correo:any)=>{
    const existeEmail= await Usuario.findOne({
        where:{
            correo:correo
        }
    });
    if(existeEmail){
        throw new Error(`El  ${correo} ya existe.`);
    }
   
}

const existeUserId=async(id:any)=>{
    const existeId= await Usuario.findByPk(id);
    if(!existeId){
        throw new Error(`El  ${id} no  existe.`);
    }
   
}

/**
 * Validar colecciones permitidas 
 */

const coleccionesPermitidas= (coleccion:any,colecciones:any[]=[])=>{

    const incluida= colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida`);
    }
    return true;
}

export {
    esRoleValido,
    existeEmail,
    existeUserId,
    coleccionesPermitidas
}