"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const archivo_1 = require("../controllers/archivo");
const log_1 = require("../middlewares/log");
const validar_roles_1 = require("../middlewares/validar-roles");
const validar_campos_1 = require("../utils/validar-campos");
const validarJWT_1 = require("../utils/validarJWT");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], archivo_1.getArchivos);
router.post('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('tipo', 'El tipo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('numero', 'El numero es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('fecha', 'La fecha es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('origen', 'El origen es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('unidad', 'La  unidad es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('descripcion', 'La  descripcion es obligatoria').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], archivo_1.postArchivo);
router.get('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('id', 'El id es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], archivo_1.getArchivo);
router.put('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('id', 'El id es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('tipo', 'El tipo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('numero', 'El numero es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('fecha', 'La fecha es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('origen', 'El origen es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('unidad', 'La  unidad es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('descripcion', 'La  descripcion es obligatoria').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], archivo_1.putArchivo);
router.delete('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    validar_roles_1.esAdminRol,
    (0, express_validator_1.check)('id', 'El id es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], archivo_1.deleteArchivo);
