"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../mysql/connection"));
const Agente = connection_1.default.define('T10_Agente', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    dpi: {
        type: sequelize_1.DataTypes.STRING
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING
    },
    correo: {
        type: sequelize_1.DataTypes.STRING
    },
    nacimiento: {
        type: sequelize_1.DataTypes.STRING
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    igss: {
        type: sequelize_1.DataTypes.STRING
    },
    nit: {
        type: sequelize_1.DataTypes.STRING
    },
    sangre: {
        type: sequelize_1.DataTypes.STRING
    },
    puesto: {
        type: sequelize_1.DataTypes.STRING
    },
    grupo: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        type: sequelize_1.DataTypes.STRING
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    },
    licenciaarma: {
        type: sequelize_1.DataTypes.STRING
    },
    licenciavehiculo: {
        type: sequelize_1.DataTypes.STRING
    },
    cv: {
        type: sequelize_1.DataTypes.STRING
    },
    ficha: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    timestamps: true,
});
//Agente.hasMany(Turno,{foreignKey:'AgenteId'})
Agente.associate = function (models) {
    Agente.hasMany(models.Turno, { foreignKey: 'AgenteId' });
};
exports.default = Agente;
