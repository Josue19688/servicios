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
exports.eliminarArchivo = exports.obtenerArchivos = exports.obtenerArchivo = exports.actualizarDocumento = exports.insertarDocumento = void 0;
const archivo_1 = __importDefault(require("../models/archivo"));
const insertarDocumento = (archivo, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo, numero, fecha, origen, unidad, descripcion } = archivo;
    const respuesta = yield archivo_1.default.create({
        tipo: tipo,
        numero: numero,
        fecha: fecha,
        origen: origen,
        unidad: unidad,
        descripcion: descripcion,
        T01UsuarioId: userId
    });
    return respuesta;
});
exports.insertarDocumento = insertarDocumento;
const actualizarDocumento = (id, archivo) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo, numero, fecha, origen, unidad, descripcion } = archivo;
    const existeArchivo = yield archivo_1.default.findByPk(id);
    if (!existeArchivo) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const respuesta = yield archivo_1.default.update({
        tipo: tipo,
        numero: numero,
        fecha: fecha,
        origen: origen,
        unidad: unidad,
        descripcion: descripcion
    }, {
        where: {
            id: id
        }
    });
    return respuesta;
});
exports.actualizarDocumento = actualizarDocumento;
const obtenerArchivo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const archivo = yield archivo_1.default.findByPk(id);
    if (!archivo) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    return archivo;
});
exports.obtenerArchivo = obtenerArchivo;
const obtenerArchivos = () => __awaiter(void 0, void 0, void 0, function* () {
    const archivos = yield archivo_1.default.findAll({
        order: [
            ['id', 'asc']
        ]
    });
    if (!archivos) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const total = yield archivo_1.default.count();
    return { total, archivos };
});
exports.obtenerArchivos = obtenerArchivos;
const eliminarArchivo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const archivo = yield archivo_1.default.findByPk(id);
    if (!archivo) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const eliminado = yield archivo_1.default.destroy({
        where: {
            id: id
        }
    });
    return eliminado;
});
exports.eliminarArchivo = eliminarArchivo;
