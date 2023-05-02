"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const server_1 = __importDefault(require("./server/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server = server_1.default.instance;
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
server.app.use(body_parser_1.default.json());
server.app.use((0, cors_1.default)());
server.app.use((0, morgan_1.default)('tiny'));
server.app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));
server.app.use('/', routes_1.router);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
