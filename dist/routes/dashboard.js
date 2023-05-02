"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const log_1 = require("../middlewares/log");
const validarJWT_1 = require("../utils/validarJWT");
const dashboard_1 = require("../controllers/dashboard");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', [
    validarJWT_1.validarToken,
    log_1.logMiddlewares
], dashboard_1.getData);
