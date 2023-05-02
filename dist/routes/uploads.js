"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const uploads_1 = require("../controllers/uploads");
const log_1 = require("../middlewares/log");
const validar_archivo_1 = require("../middlewares/validar-archivo");
const validar_roles_1 = require("../middlewares/validar-roles");
const db_validators_1 = require("../utils/db-validators");
const validar_campos_1 = require("../utils/validar-campos");
const validarJWT_1 = require("../utils/validarJWT");
const router = (0, express_1.Router)();
exports.router = router;
router.put('/:coleccion/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    validar_archivo_1.validarArchivo,
    (0, express_validator_1.check)('coleccion').custom(c => (0, db_validators_1.coleccionesPermitidas)(c, ['usuario', 'novedad', 'visita', 'archivo'])),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], uploads_1.actualizarImagen);
router.get('/:coleccion/:id', [
    (0, express_validator_1.check)('coleccion').custom(c => (0, db_validators_1.coleccionesPermitidas)(c, ['usuario', 'novedad', 'visita', 'archivo'])),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], uploads_1.mostrarImagen);
router.get('/archivo/:coleccion/:id/:archivo', [
    (0, express_validator_1.check)('coleccion').custom(c => (0, db_validators_1.coleccionesPermitidas)(c, ['usuario', 'novedad', 'visita', 'archivo'])),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], uploads_1.mostrarImagenDos);
