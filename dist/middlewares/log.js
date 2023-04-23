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
exports.botLogs = exports.logMiddlewares = void 0;
const fs_1 = __importDefault(require("fs"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const botLogs = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const token = process.env.TOKEN;
    const bot = new node_telegram_bot_api_1.default(token, { polling: true });
    const chatId = 1960098520;
    bot.on("polling_error", (msg) => console.log(msg));
    bot.sendMessage(chatId, `${data}`, { parse_mode: "HTML" });
});
exports.botLogs = botLogs;
const logMiddlewares = (req, res, next) => {
    const header = req.headers;
    const userAgent = header["user-agent"];
    const { stack } = req.route;
    const { method } = stack[0];
    const data = ` User Agente : ${userAgent}, \nMetodo : ${method}, \nUrl : ${req.baseUrl}`;
    //botLogs(data);
    fs_1.default.writeFile("log.txt", `${userAgent}-${method}-${req.baseUrl}`, (err) => {
        if (err)
            throw err;
        console.log("Completed!");
    });
    next();
};
exports.logMiddlewares = logMiddlewares;
