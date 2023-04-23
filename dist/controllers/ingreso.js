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
exports.eliminarRegistros = exports.obtenerRegistros = exports.actualizar = exports.crear = void 0;
const error_handler_1 = require("../utils/error.handler");
const ingreso_1 = require("../services/ingreso");
const crear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { id } = res.locals.usuario;
        const { ok, msg } = yield (0, ingreso_1.insertarRegistro)(body, id);
        res.json({
            ok,
            msg,
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_CREAR_REGISTROS');
    }
});
exports.crear = crear;
const actualizar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const respuesta = yield (0, ingreso_1.actualizarRegistro)(id, body);
        res.json({
            ok: true,
            respuesta
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_ACTUALIZAR_REGISTROS');
    }
});
exports.actualizar = actualizar;
const obtenerRegistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { total, ingresos } = yield (0, ingreso_1.getRegistros)();
        res.json({
            ok: true,
            total,
            ingresos
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_REGISTROS');
    }
});
exports.obtenerRegistros = obtenerRegistros;
const eliminarRegistros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const respuesta = yield (0, ingreso_1.eliminarRegistro)(id);
        res.json({
            ok: true,
            respuesta
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_DELETE_REGISTROS');
    }
});
exports.eliminarRegistros = eliminarRegistros;
