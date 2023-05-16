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
exports.deleteRegistro = exports.obtenerRegistro = exports.update = exports.crear = void 0;
const error_handler_1 = require("../utils/error.handler");
const vehiculo_1 = require("../services/vehiculo");
const crear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { id } = res.locals.usuario;
        const { ok, vehiculo } = yield (0, vehiculo_1.insertar)(body, id);
        res.json({
            ok,
            vehiculo,
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_CREAR_MOVIMIENTO_VEHICULO');
    }
});
exports.crear = crear;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const { ok, msg } = yield (0, vehiculo_1.actualizar)(id, body);
        res.json({
            ok,
            msg
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_ACTUALIZAR_MOVIMIENTO_VEHICULO');
    }
});
exports.update = update;
const obtenerRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { total, vehiculos } = yield (0, vehiculo_1.obtenerRegistros)();
        res.json({
            ok: true,
            total,
            vehiculos
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_MOVIMIENTO_VEHICULO');
    }
});
exports.obtenerRegistro = obtenerRegistro;
const deleteRegistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { ok, msg } = yield (0, vehiculo_1.eliminar)(id);
        res.json({
            ok,
            msg
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_ELIMINAR_MOVIMIENTO_VEHICULO');
    }
});
exports.deleteRegistro = deleteRegistro;
