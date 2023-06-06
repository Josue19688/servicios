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
exports.getSolicitudStatus = exports.deleteSolicitud = exports.getSolicitud = exports.putSolicitud = exports.postSolicitud = void 0;
const error_handler_1 = require("../utils/error.handler");
const solicitud_1 = require("../services/solicitud");
const postSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { id } = res.locals.usuario;
        const { ok, respuesta } = yield (0, solicitud_1.crearSolicitud)(body, id);
        res.json({
            ok,
            respuesta
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_POST_SOLICITUDES');
    }
});
exports.postSolicitud = postSolicitud;
const putSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const { ok, respuesta } = yield (0, solicitud_1.actualizarSolicitud)(body, id);
        res.json({
            ok,
            respuesta
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_PUT_SOLICITUD');
    }
});
exports.putSolicitud = putSolicitud;
const getSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ok, totalEstadoUno, totalUno, totalEstadoDos, totalDos, totalEstadoTres, totalTres, totalEstadoCuatro, totalCuatro, totalEstadoCinco, totalCinco, totalEstadoSeis, totalSeis, totalEstadoSiete, totalSiete, } = yield (0, solicitud_1.obtenerSolicitudes)();
        res.json({
            ok,
            totalEstadoUno,
            totalUno,
            totalEstadoDos,
            totalDos,
            totalEstadoTres,
            totalTres,
            totalEstadoCuatro,
            totalCuatro,
            totalEstadoCinco,
            totalCinco,
            totalEstadoSeis,
            totalSeis,
            totalEstadoSiete,
            totalSiete
        });
    }
    catch (error) {
        console.log(error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_SOLICITUD');
    }
});
exports.getSolicitud = getSolicitud;
const getSolicitudStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado } = req.params;
        console.log(estado);
        const { ok, total, status } = yield (0, solicitud_1.obtenerSolicitudesByEstado)(estado);
        res.json({
            ok,
            total,
            status
        });
    }
    catch (error) {
        console.log(error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_SOLICITUD_STATUS');
    }
});
exports.getSolicitudStatus = getSolicitudStatus;
const deleteSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { ok, respuesta } = yield (0, solicitud_1.eliminarSolicitud)(id);
        res.json({
            ok,
            respuesta
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_SOLICITUD');
    }
});
exports.deleteSolicitud = deleteSolicitud;
