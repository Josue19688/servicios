

import { Router } from "express";
import { check } from "express-validator";
import { deleteNovedad, getNovedad, getNovedades, postNovedad, updateNovedad } from "../controllers/novedad";
import { logMiddlewares } from "../middlewares/log";
import { esAdminRol, tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";

import { validarToken } from "../utils/validarJWT";


const router=Router();


router.get('/',[
    logMiddlewares,
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
],getNovedades);
router.post('/',[
    logMiddlewares,
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('tipo','El tipo es obligatorio').not().isEmpty().trim().escape(),
    check('hora','La hora es obligatoria').not().isEmpty().trim().escape(),
    check('fecha','La fecha es obligatoria').not().isEmpty().trim().escape(),
    check('puesto','El puesto es obligatorio').not().isEmpty().trim().escape(),
    check('preliminar','La preliminar es obligatoria').not().isEmpty().trim().escape(),
    validarCampos
],postNovedad);
router.get('/:id',[
    logMiddlewares,
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('id','La id es obligatorio').not().isEmpty().trim().escape(),
    validarCampos
],getNovedad);
router.put('/:id',[
    logMiddlewares,
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('id','La id es obligatorio').not().isEmpty().trim().escape(),
    check('tipo','El tipo es obligatorio').not().isEmpty().trim().escape(),
    check('hora','La hora es obligatoria').not().isEmpty().trim().escape(),
    check('fecha','La fecha es obligatoria').not().isEmpty().trim().escape(),
    check('puesto','El puesto es obligatorio').not().isEmpty().trim().escape(),
    check('preliminar','La preliminar es obligatoria').not().isEmpty().trim().escape(),
    validarCampos
],updateNovedad);
router.delete('/:id',[
    logMiddlewares,
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    esAdminRol,
    check('id','La id es obligatorio').not().isEmpty().trim().escape(),
    validarCampos
],deleteNovedad);

export {router};