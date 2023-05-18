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
exports.visitasUsuarios = exports.deleteVisita = exports.putVisita = exports.getVisitas = exports.postVisita = void 0;
const visita_1 = require("../services/visita");
const error_handler_1 = require("../utils/error.handler");
const postVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { id } = res.locals.usuario;
        const respuesta = yield (0, visita_1.insertarVisita)(body, id);
        res.json({
            ok: true,
            respuesta
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_POST_VISITA');
    }
});
exports.postVisita = postVisita;
const getVisitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const { total, visitas } = yield (0, visita_1.obtenerVisitas)(Number(limite), Number(desde));
        res.json({
            ok: true,
            total,
            visitas
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_VISITAs');
    }
});
exports.getVisitas = getVisitas;
const visitasUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { total, visitas } = yield (0, visita_1.visitaUser)(id);
        res.json({
            ok: true,
            total,
            visitas
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_VISITAS_USER');
    }
});
exports.visitasUsuarios = visitasUsuarios;
const putVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const visita = yield (0, visita_1.actualizarVisita)(id, body);
        res.json({
            ok: true,
            visita
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_PUT_VISITA');
    }
});
exports.putVisita = putVisita;
const deleteVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const visita = yield (0, visita_1.eliminarVisita)(id);
        res.json({
            ok: true,
            visita
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_DELETE_VISITA');
    }
});
exports.deleteVisita = deleteVisita;
