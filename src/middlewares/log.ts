import { NextFunction, Request, Response } from "express";
import fs from "fs";
import TelegramBot from 'node-telegram-bot-api';


const botLogs =async (data:any) => {
    const token:any = process.env.TOKEN;
    const bot = new TelegramBot(token, {polling:true});
    const chatId=1960098520;
    bot.on("polling_error", (msg) => console.log(msg));
    
    bot.sendMessage(chatId,`${data}`,{parse_mode : "HTML"})
}

const logMiddlewares=(req:Request, res:Response,next:NextFunction)=>{
    const header =  req.headers;
    const userAgent =  header["user-agent"];
    const {stack} = req.route;
    const {method} =  stack[0];
   
    
    const data =` User Agente : ${userAgent}, \nMetodo : ${method}, \nUrl : ${req.baseUrl}`;
    //botLogs(data);
    fs.writeFile("log.txt", `${userAgent}-${method}-${req.baseUrl}`, (err) => {
        if (err) throw err;
        console.log("Completed!");
     });


    next();
}

export {logMiddlewares,botLogs};