"use strict";
// const Usuario = require('../models/usuarios.models');
// const Role = require('../models/rol.models');
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
exports.coleccionesPermitidas = exports.existeUserId = exports.existeEmail = exports.esRoleValido = void 0;
const rol_1 = __importDefault(require("../models/rol"));
const usuario_1 = __importDefault(require("../models/usuario"));
const esRoleValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield rol_1.default.findOne({
        where: {
            rol: rol
        }
    });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no es válido.`);
    }
});
exports.esRoleValido = esRoleValido;
const existeEmail = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield usuario_1.default.findOne({
        where: {
            correo: correo
        }
    });
    if (existeEmail) {
        throw new Error(`El  ${correo} ya existe.`);
    }
});
exports.existeEmail = existeEmail;
const existeUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeId = yield usuario_1.default.findByPk(id);
    if (!existeId) {
        throw new Error(`El  ${id} no  existe.`);
    }
});
exports.existeUserId = existeUserId;
/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion, colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida`);
    }
    return true;
};
exports.coleccionesPermitidas = coleccionesPermitidas;
