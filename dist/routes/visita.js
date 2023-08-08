"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const visita_1 = require("../controllers/visita");
const log_1 = require("../middlewares/log");
const validar_roles_1 = require("../middlewares/validar-roles");
const validar_campos_1 = require("../utils/validar-campos");
const validarJWT_1 = require("../utils/validarJWT");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFEADMIN_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], visita_1.getVisitas);
router.get('/socket', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFEADMIN_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], visita_1.getVisitasSockets);
router.post('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('tipo', 'El tipo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('dpi', 'El dpi es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('colaborador', 'El colaborador es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('proveniente', 'El proveniente es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('ingreso', 'La hora de ingreso es obligatoria').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], visita_1.postVisita);
router.get('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFEADMIN_ROLE'),
    log_1.logMiddlewares
], visita_1.visitasUsuarios);
router.put('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('id', 'El id es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('tipo', 'El tipo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('proveniente', 'El proveniente es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('ingreso', 'La hora de ingreso es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('salida', 'La hora de salida es obligatoria').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], visita_1.putVisita);
router.delete('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFEADMIN_ROLE'),
    validar_roles_1.esAdminRol,
    (0, express_validator_1.check)('id', 'El id es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], visita_1.deleteVisita);
