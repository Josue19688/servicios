"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../mysql/connection"));
const Vehiculo = connection_1.default.define('T10_movimientovehiculos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    piloto: {
        type: sequelize_1.DataTypes.STRING
    },
    vehiculo: {
        type: sequelize_1.DataTypes.STRING
    },
    kmsalida: {
        type: sequelize_1.DataTypes.STRING
    },
    kmingreso: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    csalida: {
        type: sequelize_1.DataTypes.STRING
    },
    cingreso: {
        type: sequelize_1.DataTypes.STRING
    },
    sede: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: true,
});
exports.default = Vehiculo;
