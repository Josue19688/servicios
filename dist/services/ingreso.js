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
exports.eliminarRegistro = exports.getRegistros = exports.actualizarRegistro = exports.insertarRegistro = void 0;
const ingresos_1 = __importDefault(require("../models/ingresos"));
const sequelize_1 = __importDefault(require("sequelize"));
const insertarRegistro = (ingreso, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo, status } = ingreso;
    const registro = yield ingresos_1.default.findAll({
        attributes: [[sequelize_1.default.fn('max', sequelize_1.default.col('id')), 'max']],
        raw: true,
        where: {
            codigo: codigo,
            status: true
        }
    });
    let resultado = registro[0];
    let maximo = resultado.max;
    if (maximo > 0 || maximo !== null) {
        return { ok: false, msg: `El codigo ${codigo} tiene pendiente un registro` };
    }
    const respuesta = yield ingresos_1.default.create({
        codigo: codigo,
        status: status,
        T01UsuarioId: userId
    });
    return { ok: true, msg: respuesta };
});
exports.insertarRegistro = insertarRegistro;
const actualizarRegistro = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const existeIngreso = yield ingresos_1.default.findByPk(id);
    if (!existeIngreso) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const respuesta = yield ingresos_1.default.update({
        status: false
    }, {
        where: {
            id: id
        }
    });
    return respuesta;
});
exports.actualizarRegistro = actualizarRegistro;
const eliminarRegistro = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeIngreso = yield ingresos_1.default.findByPk(id);
    if (!existeIngreso) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const respuesta = yield ingresos_1.default.destroy({
        where: {
            id: id
        }
    });
    return respuesta;
});
exports.eliminarRegistro = eliminarRegistro;
const getRegistros = () => __awaiter(void 0, void 0, void 0, function* () {
    const status = true;
    const [total, ingresos] = yield Promise.all([
        ingresos_1.default.count({
            where: {
                status: status
            }
        }),
        ingresos_1.default.findAll({
            where: {
                status: status
            }
        })
    ]);
    return { total, ingresos };
});
exports.getRegistros = getRegistros;
