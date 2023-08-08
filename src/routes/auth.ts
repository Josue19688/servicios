

import { Router } from "express";
import { check } from "express-validator";
import { login, renovarToken } from "../controllers/auth";
import { logMiddlewares } from "../middlewares/log";
import { tieneRol } from "../middlewares/validar-roles";
import { validarCampos } from "../utils/validar-campos";
import { validarToken } from "../utils/validarJWT";

const router=Router();


router.post('/',[
    check('correo','El correo es obligatorio').isEmail().not().isEmpty(),
    check('contrasena','La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
    logMiddlewares
],login);

router.get('/',[
    validarToken,
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE','ASISTENTE_ROLE','ENCARGADO_ROLE','JEFESEGURIDAD_ROLE','JEFEADMIN_ROLE'),
    logMiddlewares
],renovarToken);
export {router};