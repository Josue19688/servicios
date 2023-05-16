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
exports.eliminarAgente = exports.obtenerAgente = exports.updateAgente = exports.crearAgente = void 0;
const error_handler_1 = require("../utils/error.handler");
const agente_1 = require("../services/agente");
const crearAgente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(body);
        const { id } = res.locals.usuario;
        const { ok, respuesta } = yield (0, agente_1.crear)(body, id);
        res.json({
            ok,
            respuesta
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_POST_AGENTE');
    }
});
exports.crearAgente = crearAgente;
const updateAgente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const { ok, respuesta } = yield (0, agente_1.actualizar)(id, body);
        res.json({
            ok,
            respuesta
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_UPDATE_AGENTE');
    }
});
exports.updateAgente = updateAgente;
const obtenerAgente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ok, totalActivos, activos, totalSupendidos, suspendidos, totalBaja, baja } = yield (0, agente_1.getAgentes)();
        res.json({
            ok,
            totalActivos,
            activos,
            totalSupendidos,
            suspendidos,
            totalBaja,
            baja
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_AGENTE');
    }
});
exports.obtenerAgente = obtenerAgente;
const eliminarAgente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { ok, respuesta } = yield (0, agente_1.eliminar)(id);
        res.json({
            ok,
            respuesta
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_DELETE_AGENTE');
    }
});
exports.eliminarAgente = eliminarAgente;
