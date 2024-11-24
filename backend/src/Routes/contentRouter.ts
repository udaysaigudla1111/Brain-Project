import { Router } from "express";
import {z} from 'zod';
import { ResponseStatus } from "../ResponseCodes/ResponseStatus";
import { Content } from "../db";
import { CustomInterface } from "../Middleware/userMiddleware";
import { userMiddleware } from "../Middleware/userMiddleware";

const contentRouter = Router();

contentRouter.post("/create",userMiddleware,async (req,res)=>{

    const userId = (req as CustomInterface).userId;
    console.log(userId);
    
    const requiredBody = z.object({
        link:z.string(),
        title:z.string(),
        type:z.string()
    })

    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success)
    {
        res.status(ResponseStatus.CLENTERROR).json({
            message:"Please enter the details correctly",
            error:parsedBody.error
        })
        return
    }

    try {

        const {link,title,type} = req.body;

        const content = await Content.create({
            link,
            title,
            type,
            userId,
            tags:[]
        })

        res.status(ResponseStatus.SUCCESS).json({
            message:"Content is Created",
            content
        })
        return
    } catch (error) {
        console.log(error);
        res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })
        return
    }

})

contentRouter.get("/bulk",userMiddleware,async (req,res)=>{

    const userId = (req as CustomInterface).userId;

    try {
        const contents = await Content.find({userId}).populate({
        path:'userId',
        select:'username -_id'
    }).exec()
    console.log(typeof contents[0].userId);
    
    res.status(ResponseStatus.SUCCESS).json({
        contents
    })

    } catch (error) {

        console.log(error);
        res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })

    }
   

})


contentRouter.delete("/remove",userMiddleware,async (req,res)=>{

    const userId  = (req as CustomInterface).userId;

    const requiredBody = z.object({
        contentId:z.string()
    })

    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success)
    {
        res.status(ResponseStatus.CLENTERROR).json({
            message:"Please enter the details correctly"
        })
        return
    }

    try {

        const contentId = parsedBody.data.contentId

        const result = await Content.deleteOne(
            {
                userId,
                _id:contentId
            }
        )

        res.status(ResponseStatus.SUCCESS).json({
            message:"Content is deleted",
            result
        })
        return
    } catch (error) {
        console.log(error);
        res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })
        return
    }


})



export {contentRouter}