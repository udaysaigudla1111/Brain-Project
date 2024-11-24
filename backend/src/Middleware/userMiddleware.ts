import { NextFunction, Request, Response } from "express";
import { ResponseStatus } from "../ResponseCodes/ResponseStatus";
import { env } from "..";
import jwt from 'jsonwebtoken';

export interface CustomInterface extends Request{
    userId:string
}

type obj = {
    userId:string
}

const userMiddleware = (req:Request,res:Response,next:NextFunction)=>{

    const token = req.headers.token as string;

    if(token)
    {
        const secret = env.success?env.data.JWT_SECRET:""
        const decodedInfo = jwt.verify(token,secret) as obj

        (req as CustomInterface).userId = decodedInfo.userId
        next();

    }
    else{
        res.status(ResponseStatus.CLENTERROR).json({
            message:"TOKEN NOT FOUND"
        })
    }



}

export {userMiddleware}