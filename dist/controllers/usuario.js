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
exports.deleteUsuario = exports.updateUsuario = exports.postUsuario = exports.getUsuarios = exports.getUsuario = void 0;
const usuario_1 = require("../services/usuario");
const error_handler_1 = require("../utils/error.handler");
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield (0, usuario_1.mostrarUsuario)(id);
        res.json({
            ok: true,
            usuario
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_USUARIO');
    }
});
exports.getUsuario = getUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { total, usuarios } = yield (0, usuario_1.mostrarUsuarios)();
        res.json({
            ok: true,
            total,
            usuarios
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_USUARIOS');
    }
});
exports.getUsuarios = getUsuarios;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const insertar = yield (0, usuario_1.insertarUsuario)(body);
        res.json({
            ok: true,
            insertar
        });
    }
    catch (error) {
        console.log(error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_POST_USUARIO');
    }
});
exports.postUsuario = postUsuario;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const { usuario } = yield (0, usuario_1.actualizarUsuario)(id, body);
        res.json({
            ok: true,
            usuario
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_PUT_USUARIO');
    }
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteUsuario = yield (0, usuario_1.eliminarUsuario)(id);
        res.json({
            ok: true,
            msg: 'Registro eliminado',
            deleteUsuario
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_DELETE_USUARIO');
    }
});
exports.deleteUsuario = deleteUsuario;
