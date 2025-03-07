import Joi from "joi";
import mongoose from "mongoose";

export const addCV=Joi.object({
    jobId:Joi.custom((value,helper)=>{
            if(mongoose.Types.ObjectId.isValid(value)){
                return true
            }
            helper.message("invalid ID")
    
        }).required(),
   
file:Joi.object({
        fieldname:Joi.string().valid("cv").required(),
        encoding:Joi.string().required(),
        originalname:Joi.string().required(),
        mimetype:Joi.string().valid("application/pdf"),
        path:Joi.string().required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        size:Joi.number().required(),})

}).required()
export const accepted=Joi.object({
    jobId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
    appId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
}).required()
export const rejected=Joi.object({
    jobId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
    appId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
}).required()