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
exports.obtenerSolicitudesByEstado = exports.eliminarSolicitud = exports.obtenerSolicitudes = exports.actualizarSolicitud = exports.crearSolicitud = void 0;
const solicitud_1 = __importDefault(require("../models/solicitud"));
const crearSolicitud = (solicitud, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_division, id_depto, id_tipo, fecha_opera, sede, nombre_solicita, puesto, autoriza, ext, estado, descripcion, correo, autorizacion, asigno, fecha_sol, } = solicitud;
    const resp = yield solicitud_1.default.create({
        id_division: id_division,
        id_depto: id_depto,
        id_tipo: id_tipo,
        fecha_opera: fecha_opera,
        sede: sede,
        nombre_solicita: nombre_solicita,
        puesto: puesto,
        autoriza: autoriza,
        ext: ext,
        estado: estado,
        descripcion: descripcion,
        correo: correo,
        autorizacion: autorizacion,
        asigno: asigno,
        fecha_sol: fecha_sol,
    });
    return { ok: true, respuesta: resp };
});
exports.crearSolicitud = crearSolicitud;
const actualizarSolicitud = (solicitud, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_division, id_depto, id_tipo, fecha_opera, sede, nombre_solicita, puesto, autoriza, ext, estado, descripcion, correo, autorizacion, asigno, fecha_sol, } = solicitud;
    const existeSolicitud = yield solicitud_1.default.findByPk(id);
    if (!existeSolicitud) {
        return { ok: false, respuesta: 'La solicitud no  existe.' };
    }
    //T01UsuarioId:id
    yield solicitud_1.default.update({
        id_division: id_division,
        id_depto: id_depto,
        id_tipo: id_tipo,
        fecha_opera: fecha_opera,
        sede: sede,
        nombre_solicita: nombre_solicita,
        puesto: puesto,
        autoriza: autoriza,
        ext: ext,
        estado: estado,
        descripcion: descripcion,
        correo: correo,
        autorizacion: autorizacion,
        asigno: asigno,
        fecha_sol: fecha_sol,
    }, {
        where: {
            id_solicitud: id
        }
    });
    const resp = yield solicitud_1.default.findByPk(id);
    return { ok: true, respuesta: resp };
});
exports.actualizarSolicitud = actualizarSolicitud;
const obtenerSolicitudes = () => __awaiter(void 0, void 0, void 0, function* () {
    const [totalEstadoUno, totalUno, totalEstadoDos, totalDos, totalEstadoTres, totalTres, totalEstadoCuatro, totalCuatro, totalEstadoCinco, totalCinco, totalEstadoSeis, totalSeis, totalEstadoSiete, totalSiete,] = yield Promise.all([
        solicitud_1.default.count({
            where: {
                estado: 1
            }
        }),
        solicitud_1.default.findAll({
            where: {
                estado: 1
            }
        }),
        solicitud_1.default.count({
            where: {
                estado: 2
            }
        }),
        solicitud_1.default.findAll({
            where: {
                estado: 2
            }
        }),
        solicitud_1.default.count({
            where: {
                estado: 3
            }
        }),
        solicitud_1.default.findAll({
            where: {
                estado: 3
            }
        }),
        solicitud_1.default.count({
            where: {
                estado: 4
            }
        }),
        solicitud_1.default.findAll({
            where: {
                estado: 4
            }
        }),
        solicitud_1.default.count({
            where: {
                estado: 5
            }
        }),
        solicitud_1.default.findAll({
            where: {
                estado: 5
            }
        }),
        solicitud_1.default.count({
            where: {
                estado: 6
            }
        }),
        solicitud_1.default.findAll({
            where: {
                estado: 6
            }
        }),
        solicitud_1.default.count({
            where: {
                estado: 7
            }
        }),
        solicitud_1.default.findAll({
            where: {
                estado: 7
            }
        }),
    ]);
    return {
        ok: true,
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
    };
});
exports.obtenerSolicitudes = obtenerSolicitudes;
const obtenerSolicitudesByEstado = (estado) => __awaiter(void 0, void 0, void 0, function* () {
    const [total, status,] = yield Promise.all([
        solicitud_1.default.count({
            where: {
                estado: estado
            }
        }),
        solicitud_1.default.findAll({
            where: {
                estado: estado
            }
        }),
    ]);
    return {
        ok: true,
        total,
        status
    };
});
exports.obtenerSolicitudesByEstado = obtenerSolicitudesByEstado;
const eliminarSolicitud = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeSolicitud = yield solicitud_1.default.findByPk(id);
    if (!existeSolicitud) {
        return { ok: false, respuesta: 'No existe el registro.' };
    }
    yield solicitud_1.default.destroy({
        where: {
            id_solicitud: id
        }
    });
    return { ok: true, respuesta: existeSolicitud };
});
exports.eliminarSolicitud = eliminarSolicitud;
