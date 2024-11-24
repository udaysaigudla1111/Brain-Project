import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {z} from 'zod'
import { userRouter } from "./Routes/userRouter";
import {contentRouter} from './Routes/contentRouter';
import { linkRouter } from "./Routes/linkRouter";

dotenv.config();


const app = express();
app.use(express.json())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/content",contentRouter)
app.use("/api/v1/brain",linkRouter)


// validating env variables using zod  ///////////////////////////////////

const requiredBody = z.object({
    url:z.string(),
    PORT:z.string(),
    JWT_SECRET:z.string()
})

export const env = requiredBody.safeParse(process.env)

if(!env.success)
{
    throw new Error(env.error.toString())
}
 
/////////////////////////////////////////////////////////////////////////

/////////////////// Connecting to the mongodb database /////////////////

mongoose.connect(env.data.url).then(()=>{
    console.log(`Successfully connected to the mongodb`);
}).catch(()=>{
    console.log(`Failed to connect to the mongodb`);
    
})

///////////////////////////////////////////////////////////////////////

app.get("/",(req,res)=>{    
    res.send("hiii")
})



app.listen(env.data.PORT,()=>{
    console.log(`Server is listening to ${env.data.PORT} port number`);
    
})