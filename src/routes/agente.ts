
import { Router } from "express";
import { check } from "express-validator";

import { logMiddlewares } from "../middlewares/log";
import { esAdminRol, tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";

import { validarToken } from "../utils/validarJWT";
import { crearAgente, eliminarAgente, mostrarAgentes, obtenerAgente, updateAgente } from "../controllers/agente";


const router=Router();


router.get('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFAADMIN_ROLE'),
    logMiddlewares
],obtenerAgente);

router.get('/agentes',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFAADMIN_ROLE'),
    logMiddlewares
],mostrarAgentes);

router.post('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFAADMIN_ROLE'),
    check('nombre','El nombre es obligatorio').not().isEmpty().trim().escape(),
    check('dpi','El dpi es obligatorio').not().isEmpty().trim().escape(),
    check('telefono','El telefono es obligatorio').not().isEmpty().trim().escape(),
    check('correo','El correo es obligatorio').not().isEmpty().trim().escape(),
    check('nacimiento','El nacimiento es obligatorio').not().isEmpty().trim().escape(),
    check('direccion','La direccion es obligatorio').not().isEmpty().trim().escape(),
    check('igss','El igss es obligatorio').not().isEmpty().trim().escape(),
    check('nit','El Nit es obligatorio').not().isEmpty().trim().escape(),
    check('sangre','El tipo de sangre es obligatorio').not().isEmpty().trim().escape(),
    check('puesto','El puesto es obligatorio').not().isEmpty().trim().escape(),
    check('grupo','El grupo es obligatorio').not().isEmpty().trim().escape(),
    check('status','El status es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],crearAgente);

router.put('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFAADMIN_ROLE'),
    validarCampos,
    logMiddlewares
],updateAgente);

router.delete('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE'),
    esAdminRol,
    validarCampos,
    logMiddlewares
],eliminarAgente);

export {router};