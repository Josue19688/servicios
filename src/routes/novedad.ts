

import { Router } from "express";
import { check } from "express-validator";
import { deleteNovedad, getNovedad, getNovedades, postNovedad, updateNovedad } from "../controllers/novedad";
import { logMiddlewares } from "../middlewares/log";
import { esAdminRol, tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";

import { validarToken } from "../utils/validarJWT";


const router=Router();


router.get('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    logMiddlewares
],getNovedades);
router.post('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('tipo','El tipo es obligatorio').not().isEmpty().trim().escape(),
    check('hora','La hora es obligatoria').not().isEmpty().trim().escape(),
    check('fecha','La fecha es obligatoria').not().isEmpty().trim().escape(),
    check('puesto','El puesto es obligatorio').not().isEmpty().trim().escape(),
    check('preliminar','La preliminar es obligatoria').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],postNovedad);
router.get('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('id','La id es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],getNovedad);
router.put('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('id','La id es obligatorio').not().isEmpty().trim().escape(),
    check('tipo','El tipo es obligatorio').not().isEmpty().trim().escape(),
    check('hora','La hora es obligatoria').not().isEmpty().trim().escape(),
    check('fecha','La fecha es obligatoria').not().isEmpty().trim().escape(),
    check('puesto','El puesto es obligatorio').not().isEmpty().trim().escape(),
    check('preliminar','La preliminar es obligatoria').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],updateNovedad);
router.delete('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    esAdminRol,
    check('id','La id es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares,
],deleteNovedad);

export {router};