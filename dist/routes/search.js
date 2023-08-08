"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const log_1 = require("../middlewares/log");
const validar_roles_1 = require("../middlewares/validar-roles");
const validar_campos_1 = require("../utils/validar-campos");
const validarJWT_1 = require("../utils/validarJWT");
const search_1 = require("../controllers/search");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/:busqueda', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFAADMIN_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], search_1.searchModel);
router.get('/:modelo/:busqueda', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFAADMIN_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], search_1.searchModelo);
router.post('/:modelo', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFAADMIN_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], search_1.searchModelofecha);
router.post('/general/:modelo', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFAADMIN_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], search_1.searchModelofechaGeneral);
