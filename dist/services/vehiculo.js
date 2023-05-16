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
exports.obtenerRegistros = exports.eliminar = exports.actualizar = exports.insertar = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const vehiculo_1 = __importDefault(require("../models/vehiculo"));
const insertar = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { piloto, vehiculo, kmsalida, csalida, sede } = data;
    /**
     * Verificar el maximo registro con el vehiculo
     * si existe un registro pendiente y esta en verdadero no dejar realizar el siguiente registro pendiente
     */
    const registro = yield vehiculo_1.default.findAll({
        attributes: [[sequelize_1.default.fn('max', sequelize_1.default.col('id')), 'max']],
        raw: true,
        where: {
            vehiculo: vehiculo,
            status: true
        }
    });
    let resultado = registro[0];
    let maximo = resultado.max;
    if (maximo > 0 || maximo !== null) {
        return { ok: false, vehiculo: `El vehiculo ${vehiculo} tiene pendiente un registro` };
    }
    const respuesta = yield vehiculo_1.default.create({
        piloto: piloto,
        vehiculo: vehiculo,
        kmsalida: kmsalida,
        status: true,
        csalida: csalida,
        sede: sede,
        T01UsuarioId: userId
    });
    return { ok: true, vehiculo: respuesta };
});
exports.insertar = insertar;
const actualizar = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const registro = yield vehiculo_1.default.findByPk(id);
    if (!registro) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const { kmingreso, cingreso, sede } = data;
    yield vehiculo_1.default.update({
        kmingreso: kmingreso,
        status: false,
        cingreso: cingreso,
        sede: sede
    }, {
        where: {
            id: id
        }
    });
    return { ok: true, msg: registro };
});
exports.actualizar = actualizar;
const eliminar = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const registro = yield vehiculo_1.default.findByPk(id);
    if (!registro) {
        return { ok: false, msg: 'El registro no existe.' };
    }
    yield vehiculo_1.default.destroy({
        where: {
            id: id
        }
    });
    return { ok: true, msg: registro };
});
exports.eliminar = eliminar;
const obtenerRegistros = () => __awaiter(void 0, void 0, void 0, function* () {
    const status = true;
    const [total, vehiculos] = yield Promise.all([
        vehiculo_1.default.count({
            where: {
                status: status
            }
        }),
        vehiculo_1.default.findAll({
            where: {
                status: status
            }
        })
    ]);
    return { total, vehiculos };
});
exports.obtenerRegistros = obtenerRegistros;
