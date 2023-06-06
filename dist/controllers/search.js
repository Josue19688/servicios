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
exports.searchModelofecha = exports.searchModelo = exports.searchModel = void 0;
const error_handler_1 = require("../utils/error.handler");
const search_1 = require("../services/search");
const searchModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.params.busqueda;
        const resultado = yield (0, search_1.buscarTodo)(search);
        res.json({
            ok: true,
            resultado
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_SEARCH_MODELS');
    }
});
exports.searchModel = searchModel;
const searchModelo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { modelo, busqueda } = req.params;
        const resultado = yield (0, search_1.searchColleccion)(modelo, busqueda);
        res.json({
            ok: true,
            resultado
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_SEARCH_COLLECTION');
    }
});
exports.searchModelo = searchModelo;
const searchModelofecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { modelo } = req.params;
        const { inicio, final, usuario } = req.body;
        const resultado = yield (0, search_1.searchColleccionDate)(modelo, inicio, final, usuario);
        res.json({
            ok: true,
            resultado
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_SEARCH_COLLECTION_REPORTERIA');
    }
});
exports.searchModelofecha = searchModelofecha;
