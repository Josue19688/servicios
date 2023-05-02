"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const novedad_1 = require("../controllers/novedad");
const log_1 = require("../middlewares/log");
const validar_roles_1 = require("../middlewares/validar-roles");
const validar_campos_1 = require("../utils/validar-campos");
const validarJWT_1 = require("../utils/validarJWT");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    log_1.logMiddlewares
], novedad_1.getNovedades);
router.post('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('tipo', 'El tipo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('hora', 'La hora es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('fecha', 'La fecha es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('puesto', 'El puesto es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('preliminar', 'La preliminar es obligatoria').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], novedad_1.postNovedad);
router.get('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('id', 'La id es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], novedad_1.getNovedad);
router.put('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('id', 'La id es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('tipo', 'El tipo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('hora', 'La hora es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('fecha', 'La fecha es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('puesto', 'El puesto es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('preliminar', 'La preliminar es obligatoria').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], novedad_1.updateNovedad);
router.delete('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    validar_roles_1.esAdminRol,
    (0, express_validator_1.check)('id', 'La id es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], novedad_1.deleteNovedad);
