"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mensaje2 = void 0;
// export const usuarioConectados=new UserList();
// export const conectarClinte=(cliente:Socket,io:socketIO.Server)=>{
//     const usuario = new Usuario(cliente.id);
//     usuarioConectados.agregar(usuario);
//     io.emit('usuarios-activos',usuarioConectados.getLista());
// }
// export const desconectar = (cliente:Socket,io:socketIO.Server)=>{
//     cliente.on('disconnect',()=>{
//         usuarioConectados.borrarUsuario(cliente.id);
//     })
// }
//escuchar mensjaes
// export const mensaje=(cliente:Socket, io:socketIO.Server)=>{
//     cliente.on('mensaje',(payload:{de:string, cuerpo:string})=>{
//         console.log('Mensaje recibido', payload);//esto nos trae el nombre de usuarios qeu dira presente
//         Capacitaciones.create({nombre:payload.de,mensaje:payload.cuerpo})
//                 .then(()=>console.log('Insertado Correctamente!!'))
//                 .catch(error=>console.log(error));
//         io.emit('mensaje-nuevo',payload);
//     })
// }
///metodo socket para seguridad y su vista de datos en tiempo real 
////registro de ingreso de personal 
const mensaje2 = (cliente, io) => {
    cliente.on('mensaje2', (payload) => {
        console.log('Mensaje recibido', payload); //esto nos trae el nombre de usuarios qeu dira presente
        io.emit('mensaje2-nuevo', payload);
    });
};
exports.mensaje2 = mensaje2;
// export const loginWS=(cliente:Socket,io:socketIO.Server)=>{
//     cliente.on('configurar-usuario',(payload:{nombre:string}, callback:Function)=>{
//         usuarioConectados.actualizarNombre(cliente.id,payload.nombre);
//         io.emit('usuarios-activos',usuarioConectados.getLista());
//         callback({
//             ok:true,
//             mensaje:`Usuario ${payload.nombre}, configurado`
//         })
//     })
// }
//obtener usuarios para cuando entramos nos cargue toda la lista
// export const obtenerUsuarios=(cliente:Socket,io:socketIO.Server)=>{
//     cliente.on('obtener-usuarios',()=>{
//         io.to(cliente.id).emit('usuarios-activos',usuarioConectados.getLista());
//     })
// }
