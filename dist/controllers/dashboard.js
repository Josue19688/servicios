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
exports.getData = void 0;
const error_handler_1 = require("../utils/error.handler");
const dashboard_1 = require("../services/dashboard");
const getData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, novedad, visita, archivo } = yield (0, dashboard_1.getInfo)();
        res.json({
            ok: true,
            usuario,
            novedad,
            visita,
            archivo
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_CONTEO');
    }
});
exports.getData = getData;
