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
exports.mostrarImagenDos = exports.mostrarImagen = exports.actualizarImagen = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const subir_archivo_1 = require("../utils/subir-archivo");
const usuario_1 = __importDefault(require("../models/usuario"));
const visita_1 = __importDefault(require("../models/visita"));
const novedad_1 = __importDefault(require("../models/novedad"));
// const cargarArchivo=async(req:Request, res:Response)=>{
//     try {
//         const pathCompleto = await subirArchivo(req.files,[],'usuario');
//         res.json({
//             path:pathCompleto
//         })
//     } catch (error) {
//         res.status(400).json({
//             msg:'Error al subir el archivo'
//         });
//     } 
// }
/**
 * NOS SERVIRA PARA VALIDAR Y SUBIR ARCHIVOS DE DIFERENTES MODELOS
 * QUE NECESITEMOS Y ASI EVITAR VOLVER A ESCRIBIR OTRO METODO
 * SOLO DEVEMOS PASARLE LAS COLECCIONES ADMITIDAS
 *
 * @param {id, coleccion modelos} parametros requeridos
 * @files {archivo} extenciones adminitdas
 * @returns modelo
 */
const actualizarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuario':
            modelo = yield usuario_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe usuario con el id :  ${id}`
                });
            }
            break;
        case 'visita':
            modelo = yield visita_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe el registro con el id :  ${id}`
                });
            }
            break;
        case 'novedad':
            modelo = yield novedad_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe el registro con el id :  ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: `Se me olvido olvidar esto`
            });
            break;
    }
    try {
        //TODO: Eliminar imagenes previas
        if (modelo.imagen) {
            const pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, modelo.imagen);
            if (fs_1.default.existsSync(pathImagen)) {
                fs_1.default.unlinkSync(pathImagen);
            }
        }
        const nombre = yield (0, subir_archivo_1.subirArchivo)(req.files, undefined, coleccion);
        let user;
        switch (coleccion) {
            case 'usuario':
                user = yield usuario_1.default.update({
                    imagen: nombre
                }, {
                    where: {
                        id: id
                    }
                });
                break;
            case 'visita':
                user = yield visita_1.default.update({
                    imagen: nombre
                }, {
                    where: {
                        id: id
                    }
                });
                break;
            case 'novedad':
                user = yield novedad_1.default.update({
                    imagen: nombre
                }, {
                    where: {
                        id: id
                    }
                });
                break;
            default:
                return res.status(500).json({
                    msg: `Se me olvido olvidar esto`
                });
                break;
        }
        res.json({
            ok: true,
            nombre
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'No se pudo subir el archivo'
        });
    }
});
exports.actualizarImagen = actualizarImagen;
const mostrarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuario':
            modelo = yield usuario_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe usuario con el id :  ${id}`
                });
            }
            break;
        case 'visita':
            modelo = yield visita_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe el registro con el id :  ${id}`
                });
            }
            break;
        case 'novedad':
            modelo = yield novedad_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe el registro con el id :  ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: `Se me olvido olvidar esto`
            });
            break;
    }
    try {
        if (modelo.imagen) {
            const pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, modelo.imagen);
            if (fs_1.default.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }
        const placeholder = path_1.default.join(__dirname, '../assets/no-image.jpg');
        return res.sendFile(placeholder);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'No se pudo subir el archivo'
        });
    }
});
exports.mostrarImagen = mostrarImagen;
const mostrarImagenDos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion, archivo } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuario':
            modelo = yield usuario_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe usuario con el id :  ${id}`
                });
            }
            break;
        case 'visita':
            modelo = yield visita_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe el registro con el id :  ${id}`
                });
            }
            break;
        case 'novedad':
            modelo = yield novedad_1.default.findByPk(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe el registro con el id :  ${id}`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: `Se me olvido olvidar esto`
            });
            break;
    }
    try {
        if (archivo) {
            const pathImagen = path_1.default.join(__dirname, '../uploads', coleccion, archivo);
            if (fs_1.default.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }
        const placeholder = path_1.default.join(__dirname, '../assets/no-image.jpg');
        return res.sendFile(placeholder);
    }
    catch (error) {
        return res.status(400).json({
            msg: 'No se realizo la solicitud.'
        });
    }
});
exports.mostrarImagenDos = mostrarImagenDos;
