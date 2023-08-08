
import { Router } from "express";
import { logMiddlewares } from "../middlewares/log";
import {  tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";
import { validarToken } from "../utils/validarJWT";
import { searchModel, searchModelo, searchModelofecha, searchModelofechaGeneral } from "../controllers/search";


const router=Router();


router.get('/:busqueda',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFAADMIN_ROLE'),
    validarCampos,
    logMiddlewares,
],searchModel);

router.get('/:modelo/:busqueda',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFAADMIN_ROLE'),
    validarCampos,
    logMiddlewares,
],searchModelo);

router.post('/:modelo',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFAADMIN_ROLE'),
    validarCampos,
    logMiddlewares,
],searchModelofecha);

router.post('/general/:modelo',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFAADMIN_ROLE'),
    validarCampos,
    logMiddlewares,
],searchModelofechaGeneral);

export {router};