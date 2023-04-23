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
exports.loginUsuario = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generarJWT_1 = __importDefault(require("../utils/generarJWT"));
const loginUsuario = (userLogin) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contrasena } = userLogin;
    const user = yield usuario_1.default.findOne({
        where: {
            correo: correo
        }
    });
    if (!user) {
        return { ok: false, msg: 'Credenciales Invalidas!' };
    }
    const { id, activo } = user.dataValues;
    if (activo === false) {
        return { ok: false, msg: 'Usuario Invalido!' };
    }
    const validPassword = yield bcryptjs_1.default.compare(contrasena, user.dataValues.contrasena);
    if (!validPassword) {
        return { ok: false, msg: 'Credenciales Invalidas!' };
    }
    const token = yield (0, generarJWT_1.default)(id);
    return { ok: true, user, token };
});
exports.loginUsuario = loginUsuario;
