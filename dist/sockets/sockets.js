"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../services/usuario");
const jwtSocket_1 = require("../utils/jwtSocket");
const visita_1 = require("../services/visita");
const novedad_1 = require("../services/novedad");
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        this.io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
            const token = socket.handshake.query['x-token'];
            const [valido, id] = yield (0, jwtSocket_1.comprobarJWT)(token);
            if (!valido) {
                return socket.disconnect();
            }
            /**
             * CONECTAMOS EL USUARIO YA IDENTIFICADO
             */
            yield (0, usuario_1.actualizaUsuarioSocket)(id, true);
            socket.on('visita-nueva', (payload) => __awaiter(this, void 0, void 0, function* () {
                yield (0, visita_1.insertarVisita)(payload, Number(id));
                this.io.emit('listar-visitas', yield (0, visita_1.obtenerVisitasSocket)());
            }));
            socket.on('novedad-nueva', (payload) => __awaiter(this, void 0, void 0, function* () {
                yield (0, novedad_1.insertarNovedad)(payload, Number(id));
                this.io.emit('listar-novedades', yield (0, novedad_1.mostrarNovedades)());
            }));
            /**
             * EMITIMOS TODOS LOS EVENTOS DE LISTADO DE DATOS
             */
            this.io.emit('listar-visitas', yield (0, visita_1.obtenerVisitasSocket)());
            this.io.emit('listar-novedades', yield (0, novedad_1.mostrarNovedades)());
            this.io.emit('lista-usuarios', yield (0, usuario_1.listarUsuariosSocket)());
            /**
             * DESCONECTAMOS AL USUARIO DEL SOCKET
             */
            socket.on('disconnect', () => __awaiter(this, void 0, void 0, function* () {
                yield (0, usuario_1.desconectarUsuarioSocket)(id);
                this.io.emit('lista-usuarios', yield (0, usuario_1.listarUsuariosSocket)());
            }));
        }));
    }
}
exports.default = Sockets;
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
