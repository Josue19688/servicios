require('dotenv').config();
import ServerSocket from "./server/server";
import bodyparser from "body-parser";
import cors from "cors";
import morgan from 'morgan';
import { router } from "./routes";
import fileUpload from 'express-fileupload';
// import { contactoBot } from "./middlewares/log";


//contactoBot();
const server = ServerSocket.instance;

server.app.use(bodyparser.urlencoded({ extended: false }));
server.app.use(bodyparser.json())
server.app.use(cors());
server.app.use(morgan('tiny'));
server.app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath:true
}))
server.app.use('/',router);
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
})