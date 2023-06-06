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
exports.searchColleccionDate = exports.searchColleccion = exports.buscarTodo = void 0;
const sequelize_1 = require("sequelize");
const usuario_1 = __importDefault(require("../models/usuario"));
const novedad_1 = __importDefault(require("../models/novedad"));
const visita_1 = __importDefault(require("../models/visita"));
const archivo_1 = __importDefault(require("../models/archivo"));
const ingresos_1 = __importDefault(require("../models/ingresos"));
const vehiculo_1 = __importDefault(require("../models/vehiculo"));
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
        case 'ingreso':
            data = yield ingresos_1.default.findAll({
                where: {
                    codigo: {
                        [sequelize_1.Op.like]: `%${search}%`
                    },
                    status: true
                },
            });
            break;
        case 'vehiculo':
            data = yield vehiculo_1.default.findAll({
                where: {
                    vehiculo: {
                        [sequelize_1.Op.like]: `%${search}%`
                    },
                    status: true
                },
            });
            break;
        default:
            return { ok: false, msg: 'Collecion no encontrada' };
    }
    return data;
});
exports.searchColleccion = searchColleccion;
// case 'medicos':
//     data = await Medico.find({ nombre: regex })
//                         .populate('usuario', 'nombre img')
//                         .populate('hospital', 'nombre img');
// break;
// case 'hospitales':
//     data = await Hospital.find({ nombre: regex })
//                             .populate('usuario', 'nombre img');
// break;
const searchColleccionDate = (colleccion, fechainicial, fechafinal, id) => __awaiter(void 0, void 0, void 0, function* () {
    let data = [];
    switch (colleccion) {
        case 'usuario':
            data = yield usuario_1.default.scope('withoutPassword').findAll({
                where: {
                    createdAt: {
                        [sequelize_1.Op.between]: [fechainicial + ' 00:00:00', fechafinal + ' 23:59:59']
                    }
                }
            });
            break;
        case 'novedad':
            data = yield novedad_1.default.findAll({
                where: {
                    createdAt: {
                        [sequelize_1.Op.and]: [
                            {
                                [sequelize_1.Op.gt]: new Date(fechainicial).toISOString(),
                                [sequelize_1.Op.lt]: new Date(`${fechafinal} 23:59:59`).toISOString(),
                            }
                        ]
                    }
                }
            });
            break;
        case 'visita':
            data = yield visita_1.default.findAll({
                where: {
                    createdAt: {
                        [sequelize_1.Op.between]: [fechainicial + ' 00:00:00', fechafinal + ' 23:59:59']
                    },
                    T01UsuarioId: `${id}`
                }
            });
            break;
        case 'archivo':
            data = yield archivo_1.default.findAll({
                where: {
                    createdAt: {
                        [sequelize_1.Op.between]: [fechainicial + ' 00:00:00', fechafinal + ' 23:59:59']
                    }
                }
            });
            break;
        case 'ingreso':
            data = yield ingresos_1.default.findAll({
                where: {
                    createdAt: {
                        [sequelize_1.Op.between]: [fechainicial + ' 00:00:00', fechafinal + ' 23:59:59']
                    }
                }
            });
            break;
        case 'vehiculo':
            data = yield vehiculo_1.default.findAll({
                where: {
                    createdAt: {
                        [sequelize_1.Op.between]: [fechainicial + ' 00:00:00', fechafinal + ' 23:59:59']
                    }
                }
            });
            break;
        default:
            return { ok: false, msg: 'Collecion no encontrada' };
    }
    return data;
});
exports.searchColleccionDate = searchColleccionDate;
