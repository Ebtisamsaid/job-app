import Companymodel from "../../DB/model/company/company.model.js"
import User from "../../DB/model/user/user.model.js"

export const bannedUnbannedUser=async(req,res,next)=>{

const {userId}=req.params
if(!req.user)return next(new Error ("you must login first",{cause:400}))
const user=await User.findById(userId)
if(!user)return next(new Error("user is not found",{cause:400}))
    if(req.user.role !== "admin")return next(new Error ("you are not allowed",{cause:400}))

if(user.bannedAt== null){
await User.findByIdAndUpdate(userId,{bannedAt:Date.now()},{new:true})
}else{
  await User.findByIdAndUpdate(userId,{bannedAt:null},{new:true})

}
return res.status(200).json({msg:"done"})
}


export const bannedUnbannedCompany=async(req,res,next)=>{

    const {companyId}=req.params
if(!req.user)return next(new Error ("you must login first",{cause:400}))
const company=await Companymodel.findById(companyId)
if(!company)return next(new Error("company is not found",{cause:400}))
    if(req.user.role !== "admin")return next(new Error ("you are not allowed",{cause:400}))

if(company.bannedAt== null){
await Companymodel.findByIdAndUpdate(companyId,{bannedAt:Date.now()},{new:true})
}else{
  await Companymodel.findByIdAndUpdate(companyId,{bannedAt:null},{new:true})

}
return res.status(200).json({msg:"done"})


}


export const approveCompany=async(req,res,next)=>{

    const {companyId}=req.params
    if(!req.user)return next(new Error ("you must login first",{cause:400}))
   
        if(req.user.role !== "admin")return next(new Error ("you are not allowed",{cause:400}))
            const company=await Companymodel.findOneAndUpdate({_id:companyId,bannedAt:null},{approvedByAdmin:true},{new:true})
        if(!company)return next(new Error("company is not found or banned",{cause:400}))

            return res.status(200).json({msg:"done",company})

}