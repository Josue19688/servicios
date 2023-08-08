"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const log_1 = require("../middlewares/log");
const validar_roles_1 = require("../middlewares/validar-roles");
const validar_campos_1 = require("../utils/validar-campos");
const validarJWT_1 = require("../utils/validarJWT");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/', [
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').isEmail().not().isEmpty(),
    (0, express_validator_1.check)('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], auth_1.login);
router.get('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE', 'ASISTENTE_ROLE', 'ENCARGADO_ROLE', 'JEFESEGURIDAD_ROLE', 'JEFEADMIN_ROLE'),
    log_1.logMiddlewares
], auth_1.renovarToken);
