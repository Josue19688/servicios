"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMiddlewares = void 0;
require('dotenv').config();
const fs_1 = __importDefault(require("fs"));
process.env.NTBA_FIX_319;
// const token:any = process.env.TOKEN;
// const bot = new TelegramBot(token, {polling:true});
// const botLogs =async (data:any) => {
//     const chatId=1960098520;
//     bot.sendMessage(chatId,`${data}`,{parse_mode : "HTML"});
// }
// const contactoBot =async () => {
//     bot.onText(/^\/getContacto/, (msg) => {
//         const opts:any = {
//           reply_markup: JSON.stringify({
//             keyboard: [
//               [{text: 'Contacto', request_contact: true}],
//             ],
//             resize_keyboard: true,
//             one_time_keyboard: true,
//           }),
//         };
//         bot.sendMessage(msg.chat.id, 'Enviar Contacto para registro de Turnos.', opts);
//     });
//     bot.on('contact', async(msg) => {
//         var chatId=msg.chat.id;
//         const telegram = msg.contact?.user_id;
//         const nombre = msg.contact?.first_name;
//         const telefono=msg.contact?.phone_number;
//         await UsuarioTelegram.create({
//             idTelegram:telegram,
//             nombre:nombre,
//             telefono:telefono
//         });
//         bot.sendMessage(chatId,`Registro agregado correctamente. Su <b>Token</b> : <i>${token}</i>  \nsolo podra utilizarlo una vez.`,{parse_mode : "HTML"});
//           console.log("Nombre: " + msg.contact?.first_name + "\nUserID:"  +  msg.contact?.user_id + "\nNúmero Telf: " + msg.contact?.phone_number);
//     });
//     bot.onText(/^\/turno/, (msg) => {
//         console.log(msg)
//         bot.sendMessage(msg.chat.id, 'Enviar Contacto para registro de Turnos.');
//     });
// }
const logMiddlewares = (req, res, next) => {
    const header = req.headers;
    const userAgent = header["user-agent"];
    const { stack } = req.route;
    const { method } = stack[0];
    //const data =` User Agente : ${userAgent}, \nMetodo : ${method}, \nUrl : ${req.baseUrl}`;
    //botLogs(data);
    fs_1.default.writeFile("log.txt", `${userAgent}-${method}-${req.baseUrl}`, (err) => {
        if (err)
            throw err;
        console.log("Completed!");
    });
    next();
};
exports.logMiddlewares = logMiddlewares;
