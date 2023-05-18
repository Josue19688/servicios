"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subirArchivo = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const subirArchivo = (files, extencionesValidas = ['png', 'jpg', 'jpeg', 'gif', 'pdf'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extencion = nombreCortado[nombreCortado.length - 1];
        //TODO: validar extenciones
        if (!extencionesValidas.includes(extencion)) {
            return reject(`La extesión ${extencion} no es válida`);
        }
        const nombreTemporal = (0, uuid_1.v4)() + '.' + extencion;
        const uploadPath = path_1.default.join(__dirname, '../uploads/', carpeta, nombreTemporal);
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(`${nombreTemporal}`);
        });
    });
};
exports.subirArchivo = subirArchivo;
