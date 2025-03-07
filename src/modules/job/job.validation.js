import Joi from "joi";
import mongoose from "mongoose";
import { jobLocation, seniorityLevel, softSkills, technicalSkills, workingTime } from "../../endpoints.js"

export const addJob=Joi.object({
    companyId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
    jobTitle:Joi.string().required(),
    jobLocation:Joi.string().valid(...Object.values(jobLocation)).required(),
    workingTime:Joi.string().valid(...Object.values(workingTime)).required(),
    seniorityLevel:Joi.string().valid(...Object.values(seniorityLevel)).required(),
    jobDescription:Joi.string().required(),
    technicalSkills:Joi.array().items(Joi.string()).required(),
    softSkills:Joi.array().items(Joi.string()).required(),


}).required()

export const updateJob=Joi.object({
    jobId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
    jobTitle:Joi.string().required(),
    jobLocation:Joi.string().valid(...Object.values(jobLocation)).required(),
    workingTime:Joi.string().valid(...Object.values(workingTime)).required(),
    seniorityLevel:Joi.string().valid(...Object.values(seniorityLevel)).required(),
    jobDescription:Joi.string().required(),
    technicalSkills:Joi.array().items(Joi.string()).required(),
    softSkills:Joi.array().items(Joi.string()).required(),


}).required()


export const deleteJob=Joi.object({
    
    jobId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
}).required()


export const getAlljobs=Joi.object({
    jobTitle:Joi.string(),
    companyName:Joi.string(),
    page:Joi.number(),
    companyId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
}).required()
export const getAllapplication=Joi.object({
    jobId:Joi.custom((value,helper)=>{
        if(mongoose.Types.ObjectId.isValid(value)){
            return true
        }
        helper.message("invalid ID")

    }).required(),
page:Joi.number()
}).required()

// export const filtersJob=Joi.object({

//     workingTime:Joi.string().valid(...Object.values(workingTime)).required() ,
//     jobLocation:Joi.string().valid(...Object.values(jobLocation)).required() ,
//     seniorityLevel:Joi.string().valid(...Object.values(seniorityLevel)).required() ,
//     jobTitle:Joi.string().required(),
//     technicalSkills:Joi.array().items(Joi.string().valid(...Object.values(technicalSkills))).required(),
//     page:Joi.string().required()
// }).required()