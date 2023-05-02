"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../mysql/connection"));
const Novedad = connection_1.default.define('T01_novedades', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING
    },
    hora: {
        type: sequelize_1.DataTypes.TIME
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
    },
    puesto: {
        type: sequelize_1.DataTypes.STRING
    },
    preliminar: {
        type: sequelize_1.DataTypes.STRING
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    timestamps: true,
});
//para registrar las novedades que ingresa el usuario
//Usuario.hasMany(Novedad);
exports.default = Novedad;
