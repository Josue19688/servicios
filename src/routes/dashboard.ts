

import { Router } from "express";
import { logMiddlewares } from "../middlewares/log";
import { validarToken } from "../utils/validarJWT";
import { getData, getGeneral, getGeneralData, getGroup } from "../controllers/dashboard";
import { tieneRol } from "../middlewares/validar-roles";


const router=Router();


router.get('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFEADMIN_ROLE'),
    logMiddlewares
],getData);
router.get('/general/:inicio/:final',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFEADMIN_ROLE'),
    logMiddlewares
],getGeneral);
router.get('/generales',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFEADMIN_ROLE'),
    logMiddlewares
],getGeneralData);
router.get('/group/:inicio/:final',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFEADMIN_ROLE'),
    logMiddlewares
],getGroup);

export {router};