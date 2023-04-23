"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_1 = require("../controllers/usuario");
const log_1 = require("../middlewares/log");
const validar_roles_1 = require("../middlewares/validar-roles");
const db_validators_1 = require("../utils/db-validators");
const validar_campos_1 = require("../utils/validar-campos");
const validarJWT_1 = require("../utils/validarJWT");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], usuario_1.getUsuarios);
router.post('/', [
    // validarToken,
    // tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').normalizeEmail().isEmail().not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('correo').custom(db_validators_1.existeEmail),
    (0, express_validator_1.check)('contrasena', 'La contraseña es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('nombre', 'La nombre es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('unidad', 'La unidad es obligatoria').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], usuario_1.postUsuario);
router.get('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUserId),
    (0, express_validator_1.check)('id', 'El id no es correcto').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], usuario_1.getUsuario);
router.put('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUserId),
    (0, express_validator_1.check)('id', 'El id no es correcto').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('correo', 'El correo es obligatorio').normalizeEmail().isEmail().not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('nombre', 'La nombre es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('unidad', 'La unidad es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('rol', 'La rol es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRoleValido),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], usuario_1.updateUsuario);
router.delete('/:id', [
    validarJWT_1.validarToken,
    (0, validar_roles_1.tieneRol)('ADMIN_ROLE', 'USER_ROLE', 'AGENTE_ROLE'),
    validar_roles_1.esAdminRol,
    (0, express_validator_1.check)('id').custom(db_validators_1.existeUserId),
    (0, express_validator_1.check)('id', 'El id no es correcto').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], usuario_1.deleteUsuario);
