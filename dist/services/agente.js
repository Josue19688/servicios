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
exports.eliminar = exports.getAgentes = exports.actualizar = exports.crear = void 0;
const agente_1 = __importDefault(require("../models/agente"));
const crear = (agente, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, dpi, telefono, correo, nacimiento, direccion, igss, nit, sangre, puesto, grupo, status } = agente;
    const existeAgente = yield agente_1.default.findOne({
        where: {
            dpi: dpi
        }
    });
    if (existeAgente) {
        return { ok: false, respuesta: 'El Agente ya existe.' };
    }
    const resp = yield agente_1.default.create({
        nombre: nombre,
        dpi: dpi,
        telefono: telefono,
        correo: correo,
        nacimiento: nacimiento,
        direccion: direccion,
        igss: igss,
        nit: nit,
        sangre: sangre,
        puesto: puesto,
        grupo: grupo,
        status: status,
        T01UsuarioId: userId
    });
    return { ok: true, respuesta: resp };
});
exports.crear = crear;
const actualizar = (id, agente) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, dpi, telefono, correo, nacimiento, direccion, igss, nit, sangre, puesto, grupo, status, imagen, licenciaarma, licenciavehiculo, cv, ficha } = agente;
    const existeAgente = yield agente_1.default.findByPk(id);
    if (!existeAgente) {
        return { ok: false, respuesta: 'El Agente no  existe.' };
    }
    yield agente_1.default.update({
        nombre: nombre,
        dpi: dpi,
        telefono: telefono,
        correo: correo,
        nacimiento: nacimiento,
        direccion: direccion,
        igss: igss,
        nit: nit,
        sangre: sangre,
        puesto: puesto,
        grupo: grupo,
        status: status,
        imagen: imagen,
        licenciaarma: licenciaarma,
        licenciavehiculo: licenciavehiculo,
        cv: cv,
        fich: ficha
    }, {
        where: {
            id: id
        }
    });
    const resp = yield agente_1.default.findByPk(id);
    return { ok: true, respuesta: resp };
});
exports.actualizar = actualizar;
const getAgentes = () => __awaiter(void 0, void 0, void 0, function* () {
    const [totalActivos, activos, totalSupendidos, suspendidos, totalBaja, baja] = yield Promise.all([
        agente_1.default.count({
            where: {
                status: 1
            }
        }),
        agente_1.default.findAll({
            where: {
                status: 1
            }
        }),
        agente_1.default.count({
            where: {
                status: 2
            }
        }),
        agente_1.default.findAll({
            where: {
                status: 2
            }
        }),
        agente_1.default.count({
            where: {
                status: 0
            }
        }),
        agente_1.default.findAll({
            where: {
                status: 0
            }
        })
    ]);
    return {
        ok: true,
        totalActivos,
        activos,
        totalSupendidos,
        suspendidos,
        totalBaja,
        baja
    };
});
exports.getAgentes = getAgentes;
const eliminar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeAgente = yield agente_1.default.findByPk(id);
    if (!existeAgente) {
        return { ok: false, respuesta: 'No existe el registro.' };
    }
    yield agente_1.default.destroy({
        where: {
            id: id
        }
    });
    return { ok: true, respuesta: existeAgente };
});
exports.eliminar = eliminar;
