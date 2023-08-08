"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const log_1 = require("../middlewares/log");
const validarJWT_1 = require("../utils/validarJWT");
const dashboard_1 = require("../controllers/dashboard");
const validar_roles_1 = require("../middlewares/validar-roles");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFEADMIN_ROLE'),
    log_1.logMiddlewares
], dashboard_1.getData);
router.get('/general/:inicio/:final', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFEADMIN_ROLE'),
    log_1.logMiddlewares
], dashboard_1.getGeneral);
router.get('/generales', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFEADMIN_ROLE'),
    log_1.logMiddlewares
], dashboard_1.getGeneralData);
router.get('/group/:inicio/:final', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFEADMIN_ROLE'),
    log_1.logMiddlewares
], dashboard_1.getGroup);
