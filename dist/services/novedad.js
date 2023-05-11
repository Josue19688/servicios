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
exports.eliminarNovedad = exports.mostrarNovedades = exports.mostrarNovedad = exports.actualizarNovedad = exports.insertarNovedad = void 0;
const novedad_1 = __importDefault(require("../models/novedad"));
const insertarNovedad = (novedad, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo, nombres, placa, vehiculo, hora, fecha, puesto, preliminar, descripcion, } = novedad;
    console.log(novedad);
    const respuesta = yield novedad_1.default.create({
        tipo: tipo,
        nombres: nombres,
        placa: placa,
        vehiculo: vehiculo,
        hora: hora,
        fecha: fecha,
        puesto: puesto,
        preliminar: preliminar,
        descripcion: descripcion,
        T01UsuarioId: userId
    });
    return respuesta;
});
exports.insertarNovedad = insertarNovedad;
const actualizarNovedad = (id, novedad) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo, nombres, placa, vehiculo, hora, fecha, puesto, preliminar, descripcion, } = novedad;
    const existeNovedad = yield novedad_1.default.findByPk(id);
    if (!existeNovedad) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const respuesta = yield novedad_1.default.update({
        tipo: tipo,
        nombres: nombres,
        placa: placa,
        vehiculo: vehiculo,
        hora: hora,
        fecha: fecha,
        puesto: puesto,
        preliminar: preliminar,
        descripcion: descripcion
    }, {
        where: {
            id: id
        }
    });
    return respuesta;
});
exports.actualizarNovedad = actualizarNovedad;
const mostrarNovedad = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const novedad = yield novedad_1.default.findByPk(id);
    if (!novedad) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    return novedad;
});
exports.mostrarNovedad = mostrarNovedad;
const mostrarNovedades = () => __awaiter(void 0, void 0, void 0, function* () {
    const novedades = yield novedad_1.default.findAll({
        order: [
            ['id', 'DESC']
        ],
    });
    const total = yield novedad_1.default.count();
    return { total, novedades };
});
exports.mostrarNovedades = mostrarNovedades;
const eliminarNovedad = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const novedad = yield novedad_1.default.findByPk(id);
    if (!novedad) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const eliminado = yield novedad_1.default.destroy({
        where: {
            id: id
        }
    });
    return eliminado;
});
exports.eliminarNovedad = eliminarNovedad;
