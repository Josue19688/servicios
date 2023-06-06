import { Router } from "express";
import { check } from "express-validator";
import { logMiddlewares } from "../middlewares/log";
import { validarCampos } from "../utils/validar-campos";
import { deleteSolicitud, getSolicitud, getSolicitudStatus, postSolicitud, putSolicitud } from "../controllers/solicitud";

const router=Router();


router.get('/',[
    logMiddlewares
],getSolicitud);
router.get('/:estado',[
    logMiddlewares
],getSolicitudStatus);
router.post('/',[
    
    check('id_division','La division es obligatoria').not().isEmpty().trim().escape(),
    check('id_depto','El Departamento es obligatorio').not().isEmpty().trim().escape(),
    check('id_tipo','El tipo es obligatorio').not().isEmpty().trim().escape(),
    check('fecha_opera','La fecha es obligatorio').not().isEmpty().trim().escape(),
    check('sede','La  sede es obligatoria').not().isEmpty().trim().escape(),
    check('nombre_solicita','El nombre es obligatorio').not().isEmpty().trim().escape(),
    check('puesto','El puesto es obligatorio').not().isEmpty().trim().escape(),
    check('ext','La fecha es obligatorio').not().isEmpty().trim().escape(),
    check('descripcion','La  unidad es obligatoria').not().isEmpty().trim().escape(),
    check('fecha_sol','La fecha es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],postSolicitud);

router.put('/:id',[
    logMiddlewares,
],putSolicitud);
router.delete('/:id',[
    check('id','El id es obligatorio').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares,
],deleteSolicitud);

export {router};