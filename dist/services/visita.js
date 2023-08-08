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
exports.obtenerVisitasSocket = exports.actualizarVisitaSocket = exports.visitaUser = exports.eliminarVisita = exports.obtenerVisitas = exports.actualizarVisita = exports.insertarVisita = void 0;
const visita_1 = __importDefault(require("../models/visita"));
const log_1 = require("../middlewares/log");
const insertarVisita = (visita, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo, puesto, nombre, dpi, colaborador, proveniente, fecha, ingreso, salida, placa, vehiculo } = visita;
    const data = `Tipo Visita : ${tipo}, \nPuesto : ${puesto}, \nNombres : ${nombre},\nDpi :${dpi},\nColaborador : ${colaborador},\nFecha : ${fecha},\nHora Ingreso : ${ingreso},\nPlacas :${placa},\nDescripcion:${proveniente}`;
    (0, log_1.botLogs)(data);
    const respuesta = yield visita_1.default.create({
        tipo: tipo,
        puesto: puesto,
        nombre: nombre,
        dpi: dpi,
        colaborador: colaborador,
        proveniente: proveniente,
        fecha: fecha,
        ingreso: ingreso,
        salida: salida,
        placa: placa,
        vehiculo: vehiculo,
        T01UsuarioId: userId
    });
    return respuesta;
});
exports.insertarVisita = insertarVisita;
const actualizarVisita = (id, visita) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo, puesto, nombre, dpi, colaborador, proveniente, fecha, ingreso, salida, placa } = visita;
    const existeVisita = yield visita_1.default.findByPk(id);
    if (!existeVisita) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const respuesta = yield visita_1.default.update({
        tipo: tipo,
        puesto: puesto,
        nombre: nombre,
        dpi: dpi,
        colaborador: colaborador,
        proveniente: proveniente,
        fecha: fecha,
        ingreso: ingreso,
        salida: salida,
        placa: placa,
        estado: false
    }, {
        where: {
            id: id
        }
    });
    return respuesta;
});
exports.actualizarVisita = actualizarVisita;
const actualizarVisitaSocket = (id, visita) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo, puesto, nombre, dpi, colaborador, proveniente, fecha, ingreso, salida, placa } = visita;
    const existeVisita = yield visita_1.default.findByPk(id);
    if (!existeVisita) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const respuesta = yield visita_1.default.update({
        tipo: tipo,
        puesto: puesto,
        nombre: nombre,
        dpi: dpi,
        colaborador: colaborador,
        proveniente: proveniente,
        fecha: fecha,
        ingreso: ingreso,
        salida: salida,
        placa: placa,
        estado: false
    }, {
        where: {
            id: id
        }
    });
    return respuesta;
});
exports.actualizarVisitaSocket = actualizarVisitaSocket;
//TODO: OBTENET VISITAS POR ID DEL USUARIO
const visitaUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const visitas = yield visita_1.default.findAll({
        where: {
            T01UsuarioId: id
        }
    });
    const total = yield visita_1.default.count({
        where: {
            T01UsuarioId: id
        }
    });
    return { total, visitas };
});
exports.visitaUser = visitaUser;
const obtenerVisitas = () => __awaiter(void 0, void 0, void 0, function* () {
    const visitas = yield visita_1.default.findAll({
        order: [
            ['id', 'DESC']
        ],
    });
    if (!visitas) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const total = yield visita_1.default.count();
    return { total, visitas };
});
exports.obtenerVisitas = obtenerVisitas;
const obtenerVisitasSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    const visitas = yield visita_1.default.findAll({
        order: [
            ['id', 'DESC']
        ],
        where: {
            estado: true
        }
    });
    if (!visitas) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const total = yield visita_1.default.count({
        where: {
            estado: true
        }
    });
    return { total, visitas };
});
exports.obtenerVisitasSocket = obtenerVisitasSocket;
const eliminarVisita = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const visita = yield visita_1.default.findByPk(id);
    if (!visita) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const eliminado = yield visita_1.default.destroy({
        where: {
            id: id
        }
    });
    return eliminado;
});
exports.eliminarVisita = eliminarVisita;
