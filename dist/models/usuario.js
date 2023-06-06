"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../mysql/connection"));
const archivo_1 = __importDefault(require("./archivo"));
const novedad_1 = __importDefault(require("./novedad"));
const visita_1 = __importDefault(require("./visita"));
const ingresos_1 = __importDefault(require("./ingresos"));
const vehiculo_1 = __importDefault(require("./vehiculo"));
const agente_1 = __importDefault(require("./agente"));
const Usuario = connection_1.default.define('T01_usuarios', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    correo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agrega un Correo Válido'
            },
            notEmpty: {
                msg: 'El e-mail no puede ir vacio'
            }
        }
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
    },
    activo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING
    },
    token: {
        type: sequelize_1.DataTypes.STRING
    },
    unidad: {
        type: sequelize_1.DataTypes.STRING
    },
    rol: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'USER_ROLE'
    },
    online: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    scopes: {
        withoutPassword: {
            attributes: { exclude: ['contrasena'] },
        }
    }
});
//para registrar las novedades que ingresa el usuario
Usuario.hasMany(novedad_1.default);
Usuario.hasMany(visita_1.default);
Usuario.hasMany(archivo_1.default);
Usuario.hasMany(ingresos_1.default);
Usuario.hasMany(vehiculo_1.default);
Usuario.hasMany(agente_1.default);
exports.default = Usuario;
