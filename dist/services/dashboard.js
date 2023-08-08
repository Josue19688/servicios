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
exports.getGroupBy = exports.getGeneralDatos = exports.getDataGeneral = exports.getInfo = void 0;
const sequelize_1 = require("sequelize");
const agente_1 = __importDefault(require("../models/agente"));
const archivo_1 = __importDefault(require("../models/archivo"));
const novedad_1 = __importDefault(require("../models/novedad"));
const usuario_1 = __importDefault(require("../models/usuario"));
const visita_1 = __importDefault(require("../models/visita"));
const getInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    //conteo de data
    const [usuario, novedad, visita, archivo] = yield Promise.all([
        usuario_1.default.count(),
        novedad_1.default.count(),
        visita_1.default.count(),
        archivo_1.default.count(),
    ]);
    return { usuario, novedad, visita, archivo };
});
exports.getInfo = getInfo;
const getDataGeneral = (inicio, final) => __awaiter(void 0, void 0, void 0, function* () {
    const [usuario, novedad, visita, archivo, agente] = yield Promise.all([
        usuario_1.default.count({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [inicio + ' 00:00:00', final + ' 23:59:59']
                }
            }
        }),
        novedad_1.default.count({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [inicio + ' 00:00:00', final + ' 23:59:59']
                }
            }
        }),
        visita_1.default.count({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [inicio + ' 00:00:00', final + ' 23:59:59']
                }
            }
        }),
        archivo_1.default.count({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [inicio + ' 00:00:00', final + ' 23:59:59']
                }
            }
        }),
        agente_1.default.count({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [inicio + ' 00:00:00', final + ' 23:59:59']
                }
            }
        })
    ]);
    return { usuario, novedad, visita, archivo, agente };
});
exports.getDataGeneral = getDataGeneral;
const getGeneralDatos = () => __awaiter(void 0, void 0, void 0, function* () {
    const [usuario, novedad, visita, archivo, agente] = yield Promise.all([
        usuario_1.default.count(),
        novedad_1.default.count(),
        visita_1.default.count(),
        archivo_1.default.count(),
        agente_1.default.count()
    ]);
    return { usuario, novedad, visita, archivo, agente };
});
exports.getGeneralDatos = getGeneralDatos;
const getGroupBy = (inicio, final) => __awaiter(void 0, void 0, void 0, function* () {
    const [novedad, visita] = yield Promise.all([
        novedad_1.default.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [inicio + ' 00:00:00', final + ' 23:59:59']
                }
            },
            group: ['tipo'],
            attributes: ['tipo', [sequelize_1.Sequelize.fn('COUNT', 'id'), 'count']],
            raw: true,
        }),
        visita_1.default.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [inicio + ' 00:00:00', final + ' 23:59:59']
                }
            },
            group: ['tipo'],
            attributes: ['tipo', [sequelize_1.Sequelize.fn('COUNT', 'id'), 'count']],
            raw: true,
        }),
    ]);
    return { novedad, visita };
});
exports.getGroupBy = getGroupBy;
