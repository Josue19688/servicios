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
exports.renovarToken = exports.login = void 0;
const auth_1 = require("../services/auth");
const error_handler_1 = require("../utils/error.handler");
const generarJWT_1 = __importDefault(require("../utils/generarJWT"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const response = yield (0, auth_1.loginUsuario)(body);
        res.json({
            response
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_LOGIN_USER');
    }
});
exports.login = login;
const renovarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = res.locals.usuario;
        const token = yield (0, generarJWT_1.default)(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_RENOVAR_TOKEN');
    }
});
exports.renovarToken = renovarToken;
