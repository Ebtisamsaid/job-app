import Joi from "joi";
import { gender } from "../../endpoints.js";
import mongoose from "mongoose";

export const updateprofilevalidation=Joi.object({

    mobileNumber:Joi.string().required(),
     DOB :Joi.string().required(),
     firstName:Joi.string().required(),
      lastName:Joi.string().required(),
       gender:Joi.string().valid(...Object.values(gender)).required()
}).required()

export const getUserProfile=Joi.object({

    id:Joi.custom((value,helper)=>{

       if( mongoose.Types.ObjectId.isValid(value)){
        return true
       }
      
    helper.message("invalid Id")
    })
}).required()
export const updatePassword=Joi.object({
    oldPassword:Joi.string().required(),
    newPassword:Joi.string().required()
}).required()

export const profilePic=Joi.object({
    file:Joi.object({
fieldname:Joi.string().required(),
originalname:Joi.string().required(),
mimtype:Joi.string().required(),
path:Joi.string().required(),
destination:Joi.string().required(),
filename:Joi.string().required(),
size:Joi.number().required(),
encoding:Joi.string().required(),
    })
}).required()
export const uploadcoverpic=Joi.object({
    file:Joi.object({
fieldname:Joi.string().required(),
encoding:Joi.string().required(),
originalname:Joi.string().required(),
mimtype:Joi.string().required(),
path:Joi.string().required(),
destination:Joi.string().required(),
filename:Joi.string().required(),
size:Joi.number().required(),
    })
}).required()