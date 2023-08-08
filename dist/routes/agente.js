"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const log_1 = require("../middlewares/log");
const validar_roles_1 = require("../middlewares/validar-roles");
const validar_campos_1 = require("../utils/validar-campos");
const validarJWT_1 = require("../utils/validarJWT");
const agente_1 = require("../controllers/agente");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFAADMIN_ROLE'),
    log_1.logMiddlewares
], agente_1.obtenerAgente);
router.get('/agentes', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFAADMIN_ROLE'),
    log_1.logMiddlewares
], agente_1.mostrarAgentes);
router.post('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFAADMIN_ROLE'),
    (0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('dpi', 'El dpi es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('telefono', 'El telefono es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('nacimiento', 'El nacimiento es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('direccion', 'La direccion es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('igss', 'El igss es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('nit', 'El Nit es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('sangre', 'El tipo de sangre es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('puesto', 'El puesto es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('grupo', 'El grupo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('status', 'El status es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], agente_1.crearAgente);
router.put('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFAADMIN_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], agente_1.updateAgente);
router.delete('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE'),
    validar_roles_1.esAdminRol,
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], agente_1.eliminarAgente);
