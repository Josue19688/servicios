
import { Router } from "express";

import { check } from "express-validator";
import { actualizarImagen,  mostrarImagen, mostrarImagenDos } from "../controllers/uploads";


import { logMiddlewares } from "../middlewares/log";
import { validarArchivo } from "../middlewares/validar-archivo";
import { tieneRol } from "../middlewares/validar-roles";
import { coleccionesPermitidas } from "../utils/db-validators";
import { validarCampos } from "../utils/validar-campos";
import { validarToken } from "../utils/validarJWT";



const router=Router();


router.put('/:coleccion/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),
    validarArchivo,
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuario','novedad','visita','archivo'])),
    validarCampos,
    logMiddlewares
],actualizarImagen);

router.get('/:coleccion/:id',[
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuario','novedad','visita','archivo'])),
    validarCampos,
    logMiddlewares
],mostrarImagen);
router.get('/archivo/:coleccion/:id/:archivo',[
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuario','novedad','visita','archivo'])),
    validarCampos,
    logMiddlewares
],mostrarImagenDos);



export {router};








