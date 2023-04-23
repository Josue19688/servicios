

import { Router } from "express";
import { check } from "express-validator";

import { logMiddlewares } from "../middlewares/log";
import { tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";

import { validarToken } from "../utils/validarJWT";
import { actualizar, crear, obtenerRegistros } from "../controllers/ingreso";


const router=Router();


router.get('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    logMiddlewares
],obtenerRegistros);
router.post('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('codigo','El codigo es obligatorio').not().isEmpty().trim().escape(),
    check('status','El status es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],crear);

router.put('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('codigo','El codigo es obligatorio').not().isEmpty().trim().escape(),
    check('status','El status es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],actualizar);
router.delete('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    validarCampos,
    logMiddlewares
],actualizar);

export {router};