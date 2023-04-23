"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const log_1 = require("../middlewares/log");
const validar_roles_1 = require("../middlewares/validar-roles");
const validar_campos_1 = require("../utils/validar-campos");
const validarJWT_1 = require("../utils/validarJWT");
const ingreso_1 = require("../controllers/ingreso");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    log_1.logMiddlewares
], ingreso_1.obtenerRegistros);
router.post('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('codigo', 'El codigo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('status', 'El status es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], ingreso_1.crear);
router.put('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('codigo', 'El codigo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('status', 'El status es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], ingreso_1.actualizar);
router.delete('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], ingreso_1.actualizar);
