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
exports.searchColleccion = exports.buscarTodo = void 0;
const sequelize_1 = require("sequelize");
const usuario_1 = __importDefault(require("../models/usuario"));
const novedad_1 = __importDefault(require("../models/novedad"));
const visita_1 = __importDefault(require("../models/visita"));
const archivo_1 = __importDefault(require("../models/archivo"));
const buscarTodo = (palabra) => __awaiter(void 0, void 0, void 0, function* () {
    const [usuario, novedad, visita, archivo] = yield Promise.all([
        usuario_1.default.scope('withoutPassword').findAll({
            where: {
                nombre: {
                    [sequelize_1.Op.like]: `%${palabra}%`
                }
            }
        }),
        novedad_1.default.findAll({
            where: {
                tipo: {
                    [sequelize_1.Op.like]: `%${palabra}%`
                }
            }
        }),
        visita_1.default.findAll({
            where: {
                tipo: {
                    [sequelize_1.Op.like]: `%${palabra}%`
                }
            }
        }),
        archivo_1.default.findAll({
            where: {
                tipo: {
                    [sequelize_1.Op.like]: `%${palabra}%`
                }
            }
        })
    ]);
    return { usuario, novedad, visita, archivo };
});
exports.buscarTodo = buscarTodo;
const searchColleccion = (colleccion, search) => __awaiter(void 0, void 0, void 0, function* () {
    let data = [];
    switch (colleccion) {
        case 'usuario':
            data = yield usuario_1.default.scope('withoutPassword').findAll({
                where: {
                    nombre: {
                        [sequelize_1.Op.like]: `%${search}%`
                    }
                }
            });
            break;
        case 'novedad':
            data = yield novedad_1.default.findAll({
                where: {
                    tipo: {
                        [sequelize_1.Op.like]: `%${search}%`
                    }
                },
            });
            break;
        case 'visita':
            data = yield visita_1.default.findAll({
                where: {
                    tipo: {
                        [sequelize_1.Op.like]: `%${search}%`
                    }
                },
            });
            break;
        case 'archivo':
            data = yield archivo_1.default.findAll({
                where: {
                    tipo: {
                        [sequelize_1.Op.like]: `%${search}%`
                    }
                },
            });
            break;
        default:
            return { ok: false, msg: 'Collecion no encontrada' };
    }
    return data;
});
exports.searchColleccion = searchColleccion;
