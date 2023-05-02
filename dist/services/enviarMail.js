"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//TODO: SIN TERMINAR DE CONFIGURAR LA OPCION
const enviarMail = (correo, asunto, texto) => {
    let sender = nodemailer_1.default.createTransport({
        host: process.env.MAIL_SERVICE,
        port: 587,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
    let mail = {
        from: "sistema@gmail.com",
        to: correo,
        subject: asunto,
        html: texto,
    };
    sender.sendMail(mail, function (error, info) {
        if (error) {
            console.log('error al envia el correo', error);
        }
        else {
            console.log("Email sent successfully: " + info.response);
        }
    });
};
exports.enviarMail = enviarMail;
