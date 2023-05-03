

import { Router } from "express";
import { check } from "express-validator";
import { logMiddlewares } from "../middlewares/log";
import { tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";
import { validarToken } from "../utils/validarJWT";
import { crear, deleteRegistro, obtenerRegistro, update } from "../controllers/vehiculo";


const router=Router();


router.get('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    logMiddlewares
],obtenerRegistro);
router.post('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('piloto','El piloto es obligatorio').not().isEmpty().trim().escape(),
    check('vehiculo','La placa es obligatoria').not().isEmpty().trim().escape(),
    check('kmsalida','El km es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],crear);

router.put('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('kmingreso','El km es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],update);
router.delete('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    validarCampos,
    logMiddlewares
],deleteRegistro);

export {router};