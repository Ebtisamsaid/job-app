

import mongoose, { Schema } from "mongoose";
import { ciphertext, decrypt } from "../../../utils/encryption/encrypt.js";
import { hash } from "../../../utils/hash/hash.js";
import { defaultcloudpic, defaultcoverpic, gender, providers, roles } from "../../../endpoints.js";
import {DateTime} from "luxon"
const userSchema = new Schema({
    firstName :String,
    lastName :String,
    mobileNumber :{type:String,required:true},
    email:{type:String,unique:[true,"email is already exist"],required:true ,lowerCase:true,match:/^[\w-\.]+@(\w){3,10}\.\w{2,5}$/},
    isConfirmed :{type:Boolean,default:false},
    isDelete:{type:Boolean,default:false},
    role:{type:String,enum:Object.values(roles),default:roles.user},
    gender:{type:String,enum:Object.values(gender),default:gender.male},
    password:{type:String,required:function(){
        return this.providers ==providers.system ? true:false
    }},
    providers:{type:String,enum:Object.values(providers)},
    TempEmail:{type:String,default:null},
    changePasswordAt:Date,
    deletedAt :Date,
    bannedAt  :{type:Date,default:null},
    updatedBy:{type: mongoose.Schema.Types.ObjectId,ref:"user"},
    DOB:{type:String,validate:{validator:function(value){
        return DateTime.now().diff(DateTime.fromISO(value),"years").years >18

    },message:"you must be older than 18"
}}
 ,
    profilePic:{secure_url:{type:String,default:defaultcloudpic.secureurlDefault},public_id:{type:String,default:defaultcloudpic.publicidDefault}}
,
coverPic:{secure_url:{type:String,default:defaultcoverpic.secureurlDefault},public_id:{type:String,default:defaultcoverpic.publicidDefault}}
,OTP:[{code:{type:String,required:true},type:{type:String,enum:["forgetPassword","confirmEmail"],required:true},expiresIn:{type:Date,required:true}}]
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})


// hooks
// userSchema.pre("save", async function(next){
// if(this.isModified("code")){
//     this.code=await hash({plaintetxt:code})
// }
// next()
// })
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await hash({plaintetxt:this.password})
    }
    if(this.isModified("mobileNumber")){
        this.mobileNumber= await ciphertext({encryptText:this.mobileNumber})
    }
    next()
})
userSchema.post("find",async function(docs){
    await Promise.all(
        docs.map(  async(doc)=>{
            if(doc.mobileNumber){
                doc.mobileNumber=await decrypt({ciphertext:this.mobileNumber})
            }
        })
    )
    
})


userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`
})

// model 
const User=mongoose.model("user",userSchema)
export default User