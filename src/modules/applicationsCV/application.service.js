import Application, { status } from "../../DB/model/applicationmodel/application.model.js"
import Jobmodel from "../../DB/model/job opportunity/job.model.js"
import cloudinary from "../../utils/file uploading/multer.cloudinary.config.js"
import { eventEmitter } from "../../utils/sendEmail/email.event.js"
export const addCV=async(req,res,next)=>{
    const{jobId}=req.params
    console.log(req.params,req.user._id);
    
    if(!req.user)return next(new Error ("you must login first",{cause:400}))
    if(!req.file)return next(new Error ("you must insert a cv",{cause:400}))
const job =await Jobmodel.findById(jobId)
    if(!job)return next(new Error("job is not found",{cause:400}))
     const{secure_url,public_id}=   await cloudinary.uploader.upload(req.file.path,{folder:`job app/CVs`})
   const addCV=await  Application.create({jobId,userId:req.user._id,userCV:{secure_url,public_id}})
   return res.status(200).json({msg:"done",addCV})
}

export const accepted=async(req,res,next)=>{
    const{jobId,appId}=req.params
    if(!req.user)return next(new Error ("you must login first",{cause:400}))

        const job =await Jobmodel.findById(jobId).populate("companyId")
        if(!job)return next(new Error("job is not found",{cause:400}))
            console.log(job.companyId.HRs);
            
            if(!job.companyId.HRs.includes(req.user._id))return next(new Error("you are not allowed",{cause:400}))
                const accepted=await Application.findByIdAndUpdate(appId,{status:status.accepted},{new:true}).populate({path:"userId",select:"email"})
            
            
            eventEmitter.emit("acceptApplication",{email:accepted.userId.email})
            return res.status(200).json({msg:"done",accepted})

}


export const rejected=async(req,res,next)=>{
    const{jobId,appId}=req.params
    if(!req.user)return next(new Error ("you must login first",{cause:400}))

        const job =await Jobmodel.findById(jobId).populate("companyId")
        if(!job)return next(new Error("job is not found",{cause:400}))
            console.log(job.companyId.HRs);
            
            if(!job.companyId.HRs.includes(req.user._id))return next(new Error("you are not allowed",{cause:400}))
                const reject=await Application.findByIdAndUpdate(appId,{status:status.rejected},{new:true}).populate({path:"userId",select:"email"})
            
            
            
            eventEmitter.emit("rejectApplication",{email:reject.userId.email})
            return res.status(200).json({msg:"done",reject})

}