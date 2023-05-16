import { Router } from "express";
import { check } from "express-validator";
import { deleteVisita,  getVisitas, postVisita, putVisita, visitasUsuarios } from "../controllers/visita";
import { logMiddlewares } from "../middlewares/log";
import { esAdminRol, tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";

import { validarToken } from "../utils/validarJWT";


const router=Router();


router.get('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    validarCampos,
    logMiddlewares,
],getVisitas);
router.post('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('tipo','El tipo es obligatorio').not().isEmpty().trim().escape(),
    check('dpi','El dpi es obligatorio').not().isEmpty().trim().escape(),
    check('colaborador','El colaborador es obligatorio').not().isEmpty().trim().escape(),
    check('proveniente','El proveniente es obligatorio').not().isEmpty().trim().escape(),
    check('ingreso','La hora de ingreso es obligatoria').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares,
],postVisita);
router.get('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    logMiddlewares
],visitasUsuarios);

router.put('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('id','El id es obligatorio').not().isEmpty().trim().escape(),
    check('tipo','El tipo es obligatorio').not().isEmpty().trim().escape(),
    check('dpi','El dpi es obligatorio').not().isEmpty().trim().escape(),
    check('colaborador','El colaborador es obligatorio').not().isEmpty().trim().escape(),
    check('proveniente','El proveniente es obligatorio').not().isEmpty().trim().escape(),
    check('ingreso','La hora de ingreso es obligatoria').not().isEmpty().trim().escape(),
    check('salida','La hora de salida es obligatoria').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],putVisita);
router.delete('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    esAdminRol,
    check('id','El id es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],deleteVisita);

export {router};