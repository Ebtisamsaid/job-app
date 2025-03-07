
import Joi from "joi";
import mongoose from "mongoose";
import { enumNumberOfempolyee, jobLocation } from "../../endpoints.js";

export const addCompany=Joi.object({


    companyName:Joi.string().required(),
    description:Joi.string().required(),
    industry:Joi.string().required(),
        address:Joi.string().required(),
        numberOfEmployees:Joi.string().valid(...Object.values(enumNumberOfempolyee)).required(),
        companyEmail:Joi.string().required(),
        CreatedBy:Joi.custom((value,helper)=>{
if(mongoose.Types.ObjectId.isValid(value)){
    return true
}
helper.message("invalid id")
        }).required(),


        file:Joi.object({
            fieldname:Joi.string().valid("legalAttachment").required(),
            encoding:Joi.string().required(),
            originalname:Joi.string().required(),
            mimetype:Joi.string().valid("pdf").required(),
            path:Joi.string().required(),
            destination:Joi.string().required(),
            filename:Joi.string().required(),
            size:Joi.number().required(),
            
        })
}).required()

export const updateCompany=Joi.object({


    companyName:Joi.string().required(),
    description:Joi.string().required(),
    industry:Joi.string().required(),
        address:Joi.string().required(),
        numberOfEmployees:Joi.string().valid(...Object.values(enumNumberOfempolyee)).required(),
        companyEmail:Joi.string().required(),
        CreatedBy:Joi.custom((value,helper)=>{
if(mongoose.Types.ObjectId.isValid(value)){
    return true
}
helper.message("invalid id")
        }).required(),
        companyId:Joi.custom((value,helper)=>{
            if(mongoose.Types.ObjectId.isValid(value)){
                return true
            }
            helper.message("invalid id")
                    }).required(),


        file:Joi.object({
            fieldname:Joi.string().valid("legalAttachment").required(),
            encoding:Joi.string().required(),
            originalname:Joi.string().required(),
            mimetype:Joi.string().valid("pdf").required(),
            path:Joi.string().required(),
            destination:Joi.string().required(),
            filename:Joi.string().required(),
            size:Joi.number().required(),
            
        })
}).required()


export const softDeleteCompany=Joi.object({
    companyId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
    helper.message("invalid Id")}).required()
    }).required()

    export const getCompanyJob=Joi.object({
        companyId:Joi.custom((value,helper)=>{
            if(mongoose.Types.ObjectId.isValid(value)){
                return true
            }
        helper.message("invalid Id")}).required()
        }).required()



      export const uploadCover=Joi.object({
        
        companyId:Joi.custom((value,helper)=>{
            if(mongoose.Types.ObjectId.isValid(value)){
                return true
            }
        helper.message("invalid Id")}).required(),
        file:Joi.object({
            fieldname:Joi.string().valid("cover").required(),
            encoding:Joi.string().required(),
            originalname:Joi.string().required(),
            mimetype:Joi.string(),
            path:Joi.string().required(),
            destination:Joi.string().required(),
            filename:Joi.string().required(),
            size:Joi.number().required(),
            
        })
}).required()

export const uploadLogo=Joi.object({
    companyId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
    helper.message("invalid Id")}).required(),
    file:Joi.object({
        fieldname:Joi.string().valid("logo").required(),
        encoding:Joi.string().required(),
        originalname:Joi.string().required(),
        mimetype:Joi.string(),
        path:Joi.string().required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        size:Joi.number().required(),
        
    })
}).required()


export const deleteLogo=Joi.object({
    companyID:Joi.custom((value,helper)=>{
if(mongoose.Types.ObjectId.isValid(value)){
    return true
}
helper.message("invalid Id")
    }).required()
}).required()
export const deleteCover=Joi.object({
    companyID:Joi.custom((value,helper)=>{
if(mongoose.Types.ObjectId.isValid(value)){
    return true
}
helper.message("invalid Id")
    }).required()
}).required()
        

export const addHr=Joi.object({
    companyID:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid Id")
            }).required(),

            newHr:Joi.custom((value,helper)=>{
                if(mongoose.Types.ObjectId.isValid(value)){
                    return true
                }
                helper.message("invalid Id")
                    }).required(),

}).required()
      