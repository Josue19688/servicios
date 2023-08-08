"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../mysql/connection"));
const Turno = connection_1.default.define('T01_turnos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inicio: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    final: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    puesto: {
        type: sequelize_1.DataTypes.STRING
    },
    horario: {
        type: sequelize_1.DataTypes.STRING
    },
    turno: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: true,
});
exports.default = Turno;
