"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRol = exports.esAdminRol = void 0;
const esAdminRol = (req, res, next) => {
    if (!res.locals.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'El rol no es válido'
        });
    }
    const { rol, nombre } = res.locals.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            msg: `${nombre}, No tiene autorización para realizar la acción`
        });
    }
    next();
};
exports.esAdminRol = esAdminRol;
const tieneRol = (...roles) => {
    return (req, res, next) => {
        if (!res.locals.usuario) {
            return res.status(500).json({
                ok: false,
                msg: 'El rol no es válido'
            });
        }
        if (!roles.includes(res.locals.usuario.rol)) {
            return res.status(401).json({
                ok: false,
                msg: 'El rol no tiene permisos para realizar acciones'
            });
        }
        next();
    };
};
exports.tieneRol = tieneRol;
