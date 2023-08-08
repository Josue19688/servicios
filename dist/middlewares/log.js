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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactoBot = exports.botLogs = exports.logMiddlewares = void 0;
require('dotenv').config();
const fs_1 = __importDefault(require("fs"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const usuarioTelegram_1 = __importDefault(require("../models/usuarioTelegram"));
process.env.NTBA_FIX_319;
const token = process.env.TOKEN;
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
const botLogs = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = 1960098520;
    bot.sendMessage(chatId, `${data}`, { parse_mode: "HTML" });
});
exports.botLogs = botLogs;
const contactoBot = () => __awaiter(void 0, void 0, void 0, function* () {
    bot.onText(/^\/getContacto/, (msg) => {
        const opts = {
            reply_markup: JSON.stringify({
                keyboard: [
                    [{ text: 'Contacto', request_contact: true }],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            }),
        };
        bot.sendMessage(msg.chat.id, 'Enviar Contacto para registro de Turnos.', opts);
    });
    bot.on('contact', (msg) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        var chatId = msg.chat.id;
        const telegram = (_a = msg.contact) === null || _a === void 0 ? void 0 : _a.user_id;
        const nombre = (_b = msg.contact) === null || _b === void 0 ? void 0 : _b.first_name;
        const telefono = (_c = msg.contact) === null || _c === void 0 ? void 0 : _c.phone_number;
        yield usuarioTelegram_1.default.create({
            idTelegram: telegram,
            nombre: nombre,
            telefono: telefono
        });
        bot.sendMessage(chatId, `Registro agregado correctamente. Su <b>Token</b> : <i>${token}</i>  \nsolo podra utilizarlo una vez.`, { parse_mode: "HTML" });
        console.log("Nombre: " + ((_d = msg.contact) === null || _d === void 0 ? void 0 : _d.first_name) + "\nUserID:" + ((_e = msg.contact) === null || _e === void 0 ? void 0 : _e.user_id) + "\nNúmero Telf: " + ((_f = msg.contact) === null || _f === void 0 ? void 0 : _f.phone_number));
    }));
    bot.onText(/^\/turno/, (msg) => {
        console.log(msg);
        bot.sendMessage(msg.chat.id, 'Enviar Contacto para registro de Turnos.');
    });
});
exports.contactoBot = contactoBot;
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
