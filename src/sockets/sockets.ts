
import { Socket } from "socket.io";
import { actualizaUsuarioSocket, desconectarUsuarioSocket, listarUsuariosSocket } from "../services/usuario";
import { comprobarJWT } from '../utils/jwtSocket';
import { VisitaInterface } from "../interfaces/visita.interfaz";
import { insertarVisita, obtenerVisitasSocket,  } from "../services/visita";
import { obtenerVisitas } from "../services/visita";
import { NovedadInterface } from "../interfaces/novedad.interface";
import { insertarNovedad, mostrarNovedades } from "../services/novedad";



export default class Sockets {
    io:Socket;
    
    constructor(io:any){
        this.io=io;
        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection',async(socket)=>{
            const token:any = socket.handshake.query['x-token'];
            
            const [valido, id]= await comprobarJWT(token);

            if(!valido){
                return socket.disconnect();
            }

            /**
             * CONECTAMOS EL USUARIO YA IDENTIFICADO
             */
            await actualizaUsuarioSocket(id as string,true);
            

            socket.on('visita-nueva',async(payload:VisitaInterface)=>{
                 await insertarVisita(payload,Number(id));
                this.io.emit('listar-visitas',await obtenerVisitasSocket());
            })

            socket.on('novedad-nueva',async(payload:NovedadInterface)=>{
                await insertarNovedad(payload,Number(id));
                this.io.emit('listar-novedades', await mostrarNovedades());
            })









            /**
             * EMITIMOS TODOS LOS EVENTOS DE LISTADO DE DATOS
             */
            this.io.emit('listar-visitas',await obtenerVisitasSocket());
            this.io.emit('listar-novedades', await mostrarNovedades());
            this.io.emit('lista-usuarios', await listarUsuariosSocket());




            /**
             * DESCONECTAMOS AL USUARIO DEL SOCKET
             */
            socket.on('disconnect',async()=>{
               
                await desconectarUsuarioSocket(id as string);
                this.io.emit('lista-usuarios', await listarUsuariosSocket());
            })
        })
    }
}


//escuchar mensjaes
// export const mensaje=(cliente:Socket, io:socketIO.Server)=>{
//     cliente.on('mensaje',(payload:{de:string, cuerpo:string})=>{
//         console.log('Mensaje recibido', payload);//esto nos trae el nombre de usuarios qeu dira presente
        
//         Capacitaciones.create({nombre:payload.de,mensaje:payload.cuerpo})
//                 .then(()=>console.log('Insertado Correctamente!!'))
//                 .catch(error=>console.log(error));

//         io.emit('mensaje-nuevo',payload);
//     })
//}


///metodo socket para seguridad y su vista de datos en tiempo real 
////registro de ingreso de personal 
// export const mensaje2=(cliente:Socket, io:socketIO.Server)=>{
//     cliente.on('mensaje2',(payload:{de:string, cuerpo:string})=>{
//         console.log('Mensaje recibido', payload);//esto nos trae el nombre de usuarios qeu dira presente
        
      

//         io.emit('mensaje2-nuevo',payload);
//     })
// }




//obtener usuarios para cuando entramos nos cargue toda la lista

// export const obtenerUsuarios=(cliente:Socket,io:socketIO.Server)=>{
//     cliente.on('obtener-usuarios',()=>{
       
//         io.to(cliente.id).emit('usuarios-activos',usuarioConectados.getLista());
    
//     })
//}