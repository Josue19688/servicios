import { AuthInterface } from "../interfaces/auth";
import Usuario from "../models/usuario";
import bcryptjs from 'bcryptjs';
import generarToken from "../utils/generarJWT";
import { enviarMail } from "./enviarMail";


const loginUsuario =async (userLogin:AuthInterface) => {
    
    const {correo, contrasena} =  userLogin;

    
    const user = await Usuario.findOne({
        where:{
            correo:correo
        }
    })

    if(!user){
        return {ok:false,msg:'Credenciales Invalidas!'};
    }

    const {id, activo}=user.dataValues;
    if(activo===false){
        return {ok:false,msg:'Usuario Invalido!'};
    }
    
    const validPassword=await bcryptjs.compare(contrasena,user.dataValues.contrasena);
    if(!validPassword){
        return {ok:false,msg:'Credenciales Invalidas!'};
    }

    
    const token = await generarToken(id);

    return {ok:true,user,token};


}
export {loginUsuario};