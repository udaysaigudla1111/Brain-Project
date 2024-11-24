import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

interface IUser{
    username:string;
    password:string
}

const userSchema = new Schema<IUser>({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

interface IContent{
    link:string,
    type:string,
    title:string,
    tags:mongoose.Types.ObjectId[],
    userId:mongoose.Types.ObjectId
} 

const contentSchema = new Schema<IContent>({

    link:{
        type:String,
        trim:true,
        required:true
    },
    type:{
        type:String,
        enum:["movies","politics","technology","audio","study"],
        required:true
    },
    title:{
        type:String,
        required:true
    },
    tags:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'tag'
        }
    ],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }

},{
    timestamps:true
})


interface ILink{
    isSharable:boolean
    hash:string,
    userId:mongoose.Types.ObjectId
}

const linkSchema = new Schema<ILink>({

    isSharable:{
        type:Boolean,
        required:true
    },
    hash:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }

})


const User = mongoose.model<IUser>('user',userSchema)
const Content = mongoose.model<IContent>('content',contentSchema)
const Link = mongoose.model<ILink>('link',linkSchema);

export {User,Content,Link}