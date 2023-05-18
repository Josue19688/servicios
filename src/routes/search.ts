



import { Router } from "express";
import { check } from "express-validator";
import { logMiddlewares } from "../middlewares/log";
import {  tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";
import { validarToken } from "../utils/validarJWT";
import { searchModel, searchModelo, searchModelofecha } from "../controllers/search";


const router=Router();


router.get('/:busqueda',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    validarCampos,
    logMiddlewares,
],searchModel);

router.get('/:modelo/:busqueda',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    validarCampos,
    logMiddlewares,
],searchModelo);

router.post('/:modelo',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    validarCampos,
    logMiddlewares,
],searchModelofecha);

export {router};