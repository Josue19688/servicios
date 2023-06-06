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
exports.desconectarUsuarioSocket = exports.actualizaUsuarioSocket = exports.eliminarUsuario = exports.actualizarUsuario = exports.listarUsuariosSocket = exports.mostrarUsuarios = exports.mostrarUsuario = exports.insertarUsuario = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const insertarUsuario = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, contrasena, activo, unidad, rol } = user;
    const existeEmail = yield usuario_1.default.findOne({
        where: {
            correo
        }
    });
    if (existeEmail) {
        return 'El correo ya existe.';
    }
    const salt = bcryptjs_1.default.genSaltSync(10);
    const passEncrypt = bcryptjs_1.default.hashSync(contrasena, salt);
    const respuestaUsuario = yield usuario_1.default.create({
        nombre: nombre,
        correo: correo,
        contrasena: passEncrypt,
        activo: activo,
        unidad: unidad,
        rol: rol
    });
    return respuestaUsuario;
});
exports.insertarUsuario = insertarUsuario;
const actualizarUsuario = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, activo, unidad, rol } = user;
    const existeUsuario = yield usuario_1.default.findByPk(id);
    if (!existeUsuario) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const respuestaUsuario = yield usuario_1.default.update({
        nombre: nombre,
        correo: correo,
        activo: activo,
        unidad: unidad,
        rol: rol
    }, {
        where: {
            id: id
        }
    });
    const usuario = yield usuario_1.default.findByPk(id);
    return { usuario, respuestaUsuario };
});
exports.actualizarUsuario = actualizarUsuario;
const mostrarUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.scope('withoutPassword').findByPk(id);
    if (!usuario) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    return usuario;
});
exports.mostrarUsuario = mostrarUsuario;
const mostrarUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.scope('withoutPassword').findAll({
        order: [
            ['id', 'DESC']
        ],
    });
    const total = yield usuario_1.default.count();
    return { total, usuarios };
});
exports.mostrarUsuarios = mostrarUsuarios;
const eliminarUsuario = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return { ok: false, msg: 'El registro no existe!' };
    }
    const eliminado = yield usuario_1.default.destroy({
        where: {
            id: id
        }
    });
    return eliminado;
});
exports.eliminarUsuario = eliminarUsuario;
/**
 * Metodos para socket
 */
const actualizaUsuarioSocket = (id, estado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return false;
        }
        yield usuario_1.default.update({
            online: true
        }, {
            where: {
                id: id
            }
        });
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.actualizaUsuarioSocket = actualizaUsuarioSocket;
const desconectarUsuarioSocket = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return false;
        }
        yield usuario_1.default.update({
            online: false
        }, {
            where: {
                id: id
            }
        });
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.desconectarUsuarioSocket = desconectarUsuarioSocket;
const listarUsuariosSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield usuario_1.default.findAll({
            where: {
                online: true
            }
        });
        return usuario;
    }
    catch (error) {
    }
});
exports.listarUsuariosSocket = listarUsuariosSocket;
