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
exports.deleteNovedad = exports.updateNovedad = exports.postNovedad = exports.getNovedades = exports.getNovedad = void 0;
const novedad_1 = require("../services/novedad");
const error_handler_1 = require("../utils/error.handler");
const getNovedad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const novedad = yield (0, novedad_1.mostrarNovedad)(id);
        res.json({
            ok: true,
            novedad
        });
    }
    catch (error) {
        console.log(error);
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_NOVEDAD');
    }
});
exports.getNovedad = getNovedad;
const getNovedades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { total, novedades } = yield (0, novedad_1.mostrarNovedades)();
        res.json({
            ok: true,
            total,
            novedades
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_NOVEDADES');
    }
});
exports.getNovedades = getNovedades;
const postNovedad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { id } = res.locals.usuario;
        const insertar = yield (0, novedad_1.insertarNovedad)(body, id);
        res.json({
            ok: true,
            insertar
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_POST_NOVEDAD');
    }
});
exports.postNovedad = postNovedad;
const updateNovedad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const body = req.body;
        const novedad = yield (0, novedad_1.actualizarNovedad)(id, body);
        res.json({
            ok: true,
            novedad
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_UPDATE_NOVEDAD');
    }
});
exports.updateNovedad = updateNovedad;
const deleteNovedad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const novedad = yield (0, novedad_1.eliminarNovedad)(id);
        res.json({
            ok: true,
            novedad
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_DELETE_NOVEDAD');
    }
});
exports.deleteNovedad = deleteNovedad;
