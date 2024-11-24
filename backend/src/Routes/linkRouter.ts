import { Router } from "express";
import { userMiddleware } from "../Middleware/userMiddleware";
import { CustomInterface } from "../Middleware/userMiddleware";
import { ResponseStatus } from "../ResponseCodes/ResponseStatus";
import { Content } from "../db";
import { Link } from "../db";
import { createHash } from "crypto";
import { env } from "..";
import {z} from 'zod'
const linkRouter = Router();

linkRouter.post("/share",userMiddleware,async (req,res)=>{

    const userId = (req as CustomInterface).userId;

    const requiredBody = z.object({
        share:z.boolean()
    })

    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success)
    {
        res.status(ResponseStatus.CLENTERROR).json({
            message:"PLEASE WRITE THE DETAILS CORRECTLY",
            error:parsedBody.error
        })
        return;
    }

    const {share} = parsedBody.data;

    if(!share)
    {
        const isLinkAvailable = await Link.findOne({userId})

        if(!isLinkAvailable)
        {
            res.status(ResponseStatus.CLENTERROR).json({
                mesage:"No link is created to disable the link"
            })
            return
        }

        const updatelink = await Link.findOneAndUpdate({userId},{
            isSharable:false
        },{
            runValidators:true,
            new:true
        }).populate({
            path:'userId',
            select:'username -_id'
        })

        res.status(ResponseStatus.SUCCESS).json({
            message:"Link accessibility is stopped",
            updatelink
        })
        return;
    }

    try {
    
        const contents = await Content.find({userId})

        if(!contents)
        {
            res.status(ResponseStatus.CLENTERROR).json({
                message:"There is no content please add the content and hit me"
            })
            return;
        }

        const isLinkAvailable = await Link.findOneAndUpdate({userId},{isSharable:true},{new:true,runValidators:true})
        if(isLinkAvailable)
        {
            res.status(ResponseStatus.SUCCESS).json({
                link:`http://localhost:${env.data?.PORT}/api/v1/brain/${isLinkAvailable.hash}`
            })
            return;
        }

        const hash = createHash('sha-256').update(userId).digest('hex')

        const LinkObj = await Link.create({
            isSharable:true,
            hash,
            userId
        })

        res.status(ResponseStatus.SUCCESS).json({
            link:`http://localhost:${env.data?.PORT}/api/v1/brain/${LinkObj.hash}`
        })

        return


    } catch (error) {
        console.log(error);
        res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })
        return;
    }

})

linkRouter.get("/:sharedlink",async (req,res)=>{
    const hash = req.params.sharedlink;

    try {

    const isLinkAvailable = await Link.findOne({hash})

    if(!isLinkAvailable)
    {
        res.status(ResponseStatus.CLENTERROR).json({
            message:"THE LINK IS INVALID"
        })
        return
    }

    if(!isLinkAvailable.isSharable)
    {
        res.status(ResponseStatus.SUCCESS).json({
            message:"ADMIN STOPPED SHARING THE LINK !!!"
        })
        return
    }

    const contents = await Content.find({userId:isLinkAvailable.userId}).populate({
        path:"userId",
        select:'username -_id'
    })

    res.status(ResponseStatus.SUCCESS).json({
        message:"Contents",
        Data:contents
    })

    return



    

    } catch (error) {
        console.log(error);
        res.status(ResponseStatus.SERVERERROR).json({
            message:"INTERNAL SERVER ERROR"
        })
        return;
    }

})


export {linkRouter}