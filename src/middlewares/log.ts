import { NextFunction, Request, Response } from "express";
import fs from "fs";

const logMiddlewares=(req:Request, res:Response,next:NextFunction)=>{
    const header =  req.headers;
    const userAgent =  header["user-agent"];
    const {stack} = req.route;
    const {method} =  stack[0];
   
    fs.writeFile("log.txt", `${userAgent}-${method}-${req.baseUrl}`, (err) => {
        if (err) throw err;
        console.log("Completed!");
     });


    next();
}

export {logMiddlewares};