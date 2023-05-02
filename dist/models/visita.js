"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../mysql/connection"));
const Visita = connection_1.default.define('T01_visita', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING
    },
    puesto: {
        type: sequelize_1.DataTypes.STRING
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    dpi: {
        type: sequelize_1.DataTypes.STRING
    },
    colaborador: {
        type: sequelize_1.DataTypes.STRING,
    },
    proveniente: {
        type: sequelize_1.DataTypes.STRING
    },
    ingreso: {
        type: sequelize_1.DataTypes.TIME
    },
    salida: {
        type: sequelize_1.DataTypes.TIME
    },
    placa: {
        type: sequelize_1.DataTypes.STRING
    },
    vehiculo: {
        type: sequelize_1.DataTypes.STRING
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: true,
});
exports.default = Visita;
