import { application } from "express";
import Companymodel from "../../DB/model/company/company.model.js"
import Jobmodel from "../../DB/model/job opportunity/job.model.js"
import Application from "../../DB/model/applicationmodel/application.model.js";

export const addJob=async (req,res,next)=>{
    const{companyId}=req.params
    console.log(companyId);
    
    const{jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills}=req.body
if(!req.user)return next(new Error("you must login first",{cause:400}))
const company=await Companymodel.findById(companyId)
if(!company)return next(new Error("company is not found or deleted"))
    if(company.CreatedBy.toString() !== req.user._id.toString() && company.HRs.toString() !== req.user._id.toString()) returnnext(new Error("you are not allowed",{cause:400}))

const createJob= await Jobmodel.create({jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,addedBy:req.user._id,companyId:companyId})
return res.status(200).json({msg:"job created",createJob})
}


export const updateJob=async(req,res,next)=>{
    const{jobId}=req.params
    const{jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills}=req.body

    if(!req.user)return next(new Error("you must login first",{cause:400}))
const job=await Jobmodel.findById(jobId)
    if(!job)return next(new Error("job is not exist"))

const company=await Companymodel.findById(job.companyId)
    if(!company)return next(new Error("company is not exist or delete"))

        if(req.user._id.toString() !== company.HRs.toString() && req.user._id.toString() !== company.CreatedBy.toString())return next(new Error("you are not allwed",{cause:400}))

            const updateJob=await job.updateOne({...req.body})
    // const job=await Jobmodel.findByIdAndUpdate(jobId,{jobTitle,jobLocation,workingTime,seniorityLevel,jobDescription,technicalSkills,softSkills,updatedBy:req.user._id},{new:true})
   
    
    return res.status(200).json({msg:"job updated",updateJob})




}


export const deleteJob=async(req,res,next)=>{
    const{jobId}=req.params
console.log(jobId);

    if(!req.user)return next(new Error("you must login first",{cause:400}))
        const job=await Jobmodel.findById(jobId)
    if(!job)return next(new Error("job is not exist"))
const company=await Companymodel.findById(job.companyId)
if(!company)return next(new Error("company is not exist or delete"))

    if(req.user._id.toString() !== company.HRs.toString() && req.user._id.toString() !== company.CreatedBy.toString())return next(new Error("you are not allwed",{cause:400}))
  const deleteJob=  await job.deleteOne()
    job.save()
    return res.status(200).json({msg:"job deleted",job})

}

export const getAlljobs=async(req,res,next)=>{
const{page,jobTitle,companyName}=req.query
const{companyId}=req.params
console.log(page,jobTitle,companyName,companyId);

if(!req.user)return next(new Error("you must login first",{cause:400}))
    const limit=2
const skip=limit*(page-1)
const company=await Companymodel.findOne({companyName})
if(!company)return next(new Error("company is not found",{cause:400}))
const job=await Jobmodel.find({jobTitle,companyId}).paginate(page,limit,skip)
console.log(job);

return res.status(200).json({msg:"done",job})

}
export const filtersJob=async(req,res,next)=>{
    const{page, workingTime , jobLocation , seniorityLevel , jobTitle,technicalSkills}=req.query
if(!req.user)return next(new Error("you must login first",{cause:400}))
    console.log(req.query);
    const limit =2
    const skip=limit*(page-1)
    const filtersJob=await Jobmodel.find({workingTime,jobLocation , seniorityLevel , jobTitle,technicalSkills}).paginate(page,limit,skip)
    
    return res.status(200).json({msg:"done",filtersJob})

}


export const getAllapplication=async(req,res,next)=>{
    const{jobId}=req.params
    console.log(jobId);
    
    const{page}=req.query
   
    if(!req.user)return next(new Error("you must login first",{cause:400}))
        const job =await Jobmodel.findById(jobId)
    if(!job)return next(new Error("job is not found",{cause:400}))

        const company =await Companymodel.findById(job.companyId)
    if(!company)return next(new Error("company is not found",{cause:400}))
        if(company.CreatedBy.toString()!== req.user._id.toString() && company.HRs.toString()!== req.user._id.toString())return next(new Error("you are not allowed",{cause:400}))
            const limit =2
    const skip=limit*(page-1)
            const allApplication =await Application.findOne({jobId}).populate({path:"userId",select:"firstName lastName"}).paginate(page,limit,skip)


        return res.status(200).json({msg:"done",allApplication})



}

// point 7 - in application.service