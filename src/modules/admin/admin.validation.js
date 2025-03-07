import Joi from "joi";
import mongoose from "mongoose";

export const bannedUnbannedUser=Joi.object({
    userId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
}).required()

export const bannedUnbannedCompany=Joi.object({
    companyId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
}).required()

export const approveCompany=Joi.object({
    companyId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
}).required()