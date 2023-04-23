

import { Router } from "express";
import { logMiddlewares } from "../middlewares/log";
import { validarToken } from "../utils/validarJWT";
import { getData } from "../controllers/dashboard";


const router=Router();


router.get('/',[
    validarToken,
   
    logMiddlewares
],getData);

export {router};