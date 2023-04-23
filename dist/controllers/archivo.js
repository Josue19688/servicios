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
exports.deleteArchivo = exports.getArchivos = exports.getArchivo = exports.putArchivo = exports.postArchivo = void 0;
const archivo_1 = require("../services/archivo");
const error_handler_1 = require("../utils/error.handler");
const postArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { id } = res.locals.usuario;
        const archivo = yield (0, archivo_1.insertarDocumento)(body, id);
        res.json({
            ok: true,
            archivo
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_POST_ARCHIVO');
    }
});
exports.postArchivo = postArchivo;
const putArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const archivo = yield (0, archivo_1.actualizarDocumento)(id, body);
        res.json({
            ok: true,
            archivo
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_PUT_ARCHIVO');
    }
});
exports.putArchivo = putArchivo;
const getArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const archivo = yield (0, archivo_1.obtenerArchivo)(id);
        res.json({
            ok: true,
            archivo
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_ARCHIVO');
    }
});
exports.getArchivo = getArchivo;
const getArchivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { total, archivos } = yield (0, archivo_1.obtenerArchivos)();
        res.json({
            ok: true,
            total,
            archivos
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_ARCHIVOS');
    }
});
exports.getArchivos = getArchivos;
const deleteArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const archivo = yield (0, archivo_1.eliminarArchivo)(id);
        res.json({
            ok: true,
            archivo
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_DELETE_ARCHIVO');
    }
});
exports.deleteArchivo = deleteArchivo;
