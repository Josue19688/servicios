"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const log_1 = require("../middlewares/log");
const validar_roles_1 = require("../middlewares/validar-roles");
const validar_campos_1 = require("../utils/validar-campos");
const validarJWT_1 = require("../utils/validarJWT");
const vehiculo_1 = require("../controllers/vehiculo");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE'),
    log_1.logMiddlewares
], vehiculo_1.obtenerRegistro);
router.post('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE'),
    (0, express_validator_1.check)('piloto', 'El piloto es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('vehiculo', 'La placa es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('kmsalida', 'El km es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], vehiculo_1.crear);
router.put('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE'),
    (0, express_validator_1.check)('kmingreso', 'El km es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], vehiculo_1.update);
router.delete('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], vehiculo_1.deleteRegistro);
