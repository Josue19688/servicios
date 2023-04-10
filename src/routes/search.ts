



import { Router } from "express";
import { check } from "express-validator";
import { logMiddlewares } from "../middlewares/log";
import {  tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";
import { validarToken } from "../utils/validarJWT";
import { searchModel, searchModelo } from "../controllers/search";


const router=Router();


router.get('/:busqueda',[
    logMiddlewares,
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    validarCampos
],searchModel);

router.get('/:modelo/:busqueda',[
    logMiddlewares,
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    validarCampos
],searchModelo);

export {router};