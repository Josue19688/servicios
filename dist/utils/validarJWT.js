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
exports.validarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validarToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No tiene autorización'
        });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, 'CCdGc1AA12O23');
        const usuario = yield usuario_1.default.scope('withoutPassword').findByPk(id);
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        const { activo } = usuario === null || usuario === void 0 ? void 0 : usuario.dataValues;
        if (!activo) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorización para realizar la tarea'
            });
        }
        res.locals.usuario = usuario.dataValues;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido!'
        });
    }
});
exports.validarToken = validarToken;
