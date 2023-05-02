import { Router } from "express";
import { check } from "express-validator";
import { deleteArchivo, getArchivo, getArchivos, postArchivo, putArchivo } from "../controllers/archivo";
import { logMiddlewares } from "../middlewares/log";
import { esAdminRol, tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";

import { validarToken } from "../utils/validarJWT";


const router=Router();


router.get('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    validarCampos,
    logMiddlewares
],getArchivos);
router.post('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('tipo','El tipo es obligatorio').not().isEmpty().trim().escape(),
    check('numero','El numero es obligatorio').not().isEmpty().trim().escape(),
    check('fecha','La fecha es obligatorio').not().isEmpty().trim().escape(),
    check('origen','El origen es obligatorio').not().isEmpty().trim().escape(),
    check('unidad','La  unidad es obligatoria').not().isEmpty().trim().escape(),
    check('descripcion','La  descripcion es obligatoria').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],postArchivo);
router.get('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('id','El id es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares,
],getArchivo);
router.put('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    check('id','El id es obligatorio').not().isEmpty().trim().escape(),
    check('tipo','El tipo es obligatorio').not().isEmpty().trim().escape(),
    check('numero','El numero es obligatorio').not().isEmpty().trim().escape(),
    check('fecha','La fecha es obligatorio').not().isEmpty().trim().escape(),
    check('origen','El origen es obligatorio').not().isEmpty().trim().escape(),
    check('unidad','La  unidad es obligatoria').not().isEmpty().trim().escape(),
    check('descripcion','La  descripcion es obligatoria').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares,
],putArchivo);
router.delete('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    esAdminRol,
    check('id','El id es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares,
],deleteArchivo);

export {router};