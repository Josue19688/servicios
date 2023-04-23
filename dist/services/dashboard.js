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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = void 0;
const archivo_1 = __importDefault(require("../models/archivo"));
const novedad_1 = __importDefault(require("../models/novedad"));
const usuario_1 = __importDefault(require("../models/usuario"));
const visita_1 = __importDefault(require("../models/visita"));
const getInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    //conteo de data
    const [usuario, novedad, visita, archivo] = yield Promise.all([
        usuario_1.default.count(),
        novedad_1.default.count(),
        visita_1.default.count(),
        archivo_1.default.count(),
    ]);
    return { usuario, novedad, visita, archivo };
});
exports.getInfo = getInfo;
