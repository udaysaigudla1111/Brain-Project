import { Router } from "express";
import { z } from "zod";
import { User } from "../db";
import bcrypt, { hash } from 'bcrypt'
import {ResponseStatus} from '../ResponseCodes/ResponseStatus'
import jwt from "jsonwebtoken";
import { env } from "..";

const userRouter = Router();

userRouter.post("/signup",async (req,res)=>{

    const requiredBody = z.object({
        username:z.string().min(3,{message:"Your username should be above 3 letters"}).email(),
        password:z.string()
    })

    const parsedBody = requiredBody.safeParse(req.body)    

    if(!parsedBody.success)
    {
        res.status(ResponseStatus.CLENTERROR).json({
            message:"Please enter the proper username and password",
            error:parsedBody.error
        })
        return
    }

    const {username,password} = parsedBody.data;

    try {

        const isUserExists = await User.findOne({username})

        if(isUserExists)
        {
            res.status(ResponseStatus.CLENTERROR).json({
                message:"User already exists please signin"
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password,5);

        const user = await User.create({
            username,
            password:hashedPassword
        })

        if(user)
        {
            res.status(ResponseStatus.SUCCESS).json({
                message:"User signup successfully",
                user
            })
            return
        }

    } catch (error) {
        console.log(error);
        res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })
    }

})

userRouter.post("/signin",async (req,res)=>{

    const requiredBody = z.object({
        username:z.string().email(),
        password:z.string()
    })

    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success)
    {
        res.status(ResponseStatus.CLENTERROR).json({
            message:"Please Enter the Details correctly",
            error:parsedBody.error
        })
        return;
    }

    try {

        const {username,password} = parsedBody.data

        const isUserExists = await User.findOne({username})

        if(!isUserExists)
        {
            res.status(ResponseStatus.CLENTERROR).json({
                message:"User does not exists please signup"
            })
            return
        }

        const isPasswordMatched = await bcrypt.compare(password,isUserExists.password)

        if(!isPasswordMatched)
        {
            res.status(ResponseStatus.CLENTERROR).json({
                message:"Password is incorrect !!!"
            })
            return;
        }
        const secret = env.success?env.data.JWT_SECRET:""
        const token = jwt.sign({userId:isUserExists._id},secret)
        res.status(ResponseStatus.SUCCESS).json({
            token
        })
        return


    } catch (error) {
        console.log(error);
        res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })
    }

})

export {userRouter}