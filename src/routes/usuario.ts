
import { Router } from "express";
import { check } from "express-validator";
import { deleteUsuario,getUsuario, getUsuarios, postUsuario, updateUsuario } from "../controllers/usuario";
import { logMiddlewares } from "../middlewares/log";
import { esAdminRol, tieneRol } from "../middlewares/validar-roles";
import { esRoleValido, existeEmail, existeUserId } from "../utils/db-validators";
import { validarCampos } from "../utils/validar-campos";
import { validarToken } from "../utils/validarJWT";


const router=Router();


router.get('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE'),
    validarCampos,
    logMiddlewares
],getUsuarios);
router.post('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE'),
    check('correo','El correo es obligatorio').normalizeEmail().isEmail().not().isEmpty().trim().escape(),
    check('correo').custom(existeEmail),
    check('contrasena','La contraseña es obligatoria').not().isEmpty().trim().escape(),
    check('nombre','La nombre es obligatoria').not().isEmpty().trim().escape(),
    check('unidad','La unidad es obligatoria').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],postUsuario);
router.get('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE'),
    check('id').custom(existeUserId),
    check('id','El id no es correcto').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],getUsuario);
router.put('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE'),
    check('id').custom(existeUserId),
    check('id','El id no es correcto').not().isEmpty().trim().escape(),
    check('correo','El correo es obligatorio').normalizeEmail().isEmail().not().isEmpty().trim().escape(),
    check('nombre','La nombre es obligatoria').not().isEmpty().trim().escape(),
    check('unidad','La unidad es obligatoria').not().isEmpty().trim().escape(),
    check('rol','La rol es obligatoria').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],updateUsuario);
router.delete('/:id',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE'),
    esAdminRol,
    check('id').custom(existeUserId),
    check('id','El id no es correcto').not().isEmpty().trim().escape(),
    validarCampos,
    logMiddlewares
],deleteUsuario);

export {router};