import bcryptjs from 'bcryptjs'
import { UsuarioInterface } from '../interfaces/usuario.interface';
import Usuario from "../models/usuario"


const insertarUsuario =async(user:UsuarioInterface)=>{
    const {
        nombre,
        correo,
        contrasena,
        activo,
        unidad,
        rol } =user;

    const existeEmail = await Usuario.findOne({
        where:{
            correo
        }
    });

    if(existeEmail){
        return 'El correo ya existe.';
    }

    const salt =  bcryptjs.genSaltSync(10);
    const passEncrypt=bcryptjs.hashSync(contrasena,salt);


    const respuestaUsuario = await Usuario.create({
        nombre:nombre,
        correo:correo,
        contrasena:passEncrypt,
        activo:activo,
        unidad:unidad,
        rol:rol
    });
    return respuestaUsuario;
}

const actualizarUsuario =async(id:any,user:UsuarioInterface)=>{
    const {
        nombre,
        correo,
        activo,
        unidad,
        rol } =user;

    const existeUsuario = await Usuario.findByPk(id);
    if(!existeUsuario){
        return {ok:false,msg:'El registro no existe!'}
    }



    const respuestaUsuario = await Usuario.update({
        nombre:nombre,
        correo:correo,
        activo:activo,
        unidad:unidad,
        rol:rol
    },{
        where:{
            id:id
        }
    });

    const usuario = await Usuario.findByPk(id);

    return {usuario,respuestaUsuario};

}

const mostrarUsuario = async(id:string)=>{

    const usuario = await Usuario.scope('withoutPassword').findByPk(id);
   
    if(!usuario){
        return {ok:false,msg:'El registro no existe!'}
    }

    return usuario;
}

const mostrarUsuarios =  async(limite:number,desde:number)=>{
    const usuarios  = await Usuario.scope('withoutPassword').findAll({
        order:[
            ['nombre','DESC']
        ],
        offset:desde,
        limit:limite
    });
    const total = await Usuario.count();
    return {total, usuarios};
}


const eliminarUsuario =async(id:string)=>{
    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return {ok:false,msg:'El registro no existe!'}
    }

    const eliminado =  await Usuario.destroy({
        where:{
            id:id
        }
    })

    return eliminado;
}

export{insertarUsuario,mostrarUsuario,mostrarUsuarios, actualizarUsuario, eliminarUsuario};