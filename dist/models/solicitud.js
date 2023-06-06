"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../mysql/connection"));
const Solicitud = connection_1.default.define('T03_solicituds', {
    id_solicitud: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_division: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_depto: {
        type: sequelize_1.DataTypes.INTEGER
    },
    id_tipo: {
        type: sequelize_1.DataTypes.INTEGER
    },
    fecha_opera: {
        type: sequelize_1.DataTypes.DATE
    },
    sede: {
        type: sequelize_1.DataTypes.STRING
    },
    nombre_solicita: {
        type: sequelize_1.DataTypes.STRING
    },
    puesto: {
        type: sequelize_1.DataTypes.STRING
    },
    autoriza: {
        type: sequelize_1.DataTypes.STRING
    },
    ext: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.INTEGER
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    autorizacion: {
        type: sequelize_1.DataTypes.INTEGER
    },
    asigno: {
        type: sequelize_1.DataTypes.STRING
    },
    fecha_sol: {
        type: sequelize_1.DataTypes.DATEONLY
    },
}, {
    timestamps: false
});
exports.default = Solicitud;
