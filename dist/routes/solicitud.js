"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const log_1 = require("../middlewares/log");
const validar_campos_1 = require("../utils/validar-campos");
const solicitud_1 = require("../controllers/solicitud");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    log_1.logMiddlewares
], solicitud_1.getSolicitud);
router.get('/:estado', [
    log_1.logMiddlewares
], solicitud_1.getSolicitudStatus);
router.post('/', [
    (0, express_validator_1.check)('id_division', 'La division es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('id_depto', 'El Departamento es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('id_tipo', 'El tipo es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('fecha_opera', 'La fecha es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('sede', 'La  sede es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('nombre_solicita', 'El nombre es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('puesto', 'El puesto es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('ext', 'La fecha es obligatorio').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('descripcion', 'La  unidad es obligatoria').not().isEmpty().trim().escape(),
    (0, express_validator_1.check)('fecha_sol', 'La fecha es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares
], solicitud_1.postSolicitud);
router.put('/:id', [
    log_1.logMiddlewares,
], solicitud_1.putSolicitud);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'El id es obligatorio').not().isEmpty().trim().escape(),
    validar_campos_1.validarCampos,
    log_1.logMiddlewares,
], solicitud_1.deleteSolicitud);
