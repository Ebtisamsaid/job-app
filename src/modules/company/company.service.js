
import { nanoid } from "nanoid"
import Companymodel from "../../DB/model/company/company.model.js"
import cloudinary from "../../utils/file uploading/multer.cloudinary.config.js"
import { defaultcloudpic, roles } from "../../endpoints.js"

export const addCompany=async (req,res,next)=>{
    
    const {companyName,description,industry,
        address,numberOfEmployees,companyEmail,legalAttachment}=req.body
        if(!req.user) return next(new Error (" you must log in first ",{cause:400}))
            
            
        const company =await Companymodel.findOne({$or:[{companyName},{companyEmail}]})
    if(company )return next(new Error ("company is already exist",{cause:400}))
        let cloudfolder;
    let pdf;
        if(req.file){
           cloudfolder=nanoid()
            let {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`job app/company/${cloudfolder}/legalAttachment`})
            console.log({secure_url,public_id});
            pdf={secure_url,public_id}
            
        }
        const addedcompany=await Companymodel.create({companyName,description,industry,
            address,numberOfEmployees,companyEmail,CreatedBy:req.user._id,legalAttachment:pdf})



        return res.status(200).json({msg:"company added successfully",addedcompany})

}
export const updateCompany=async(req,res,next)=>{
   const {companyName,description,industry,
    address,numberOfEmployees,companyEmail,legalAttachment}=req.body
        console.log(companyName);
        const{companyId}=req.params
     
        
        if(!req.user) return next(new Error (" you must log in first ",{cause:400}))
            const company =await Companymodel.findById(companyId)
       
        
        if(!company )return next(new Error ("company is not exist",{cause:400}))
            if(req.user._id.toString() !== company.CreatedBy.toString()) return next(new Error("your are not allowed",{cause:400}))
               
                
                if(req.body.legalAttachment){
                    delete req.body.legalAttachment
                }
          
                
                const updatedCompany=await Companymodel.findByIdAndUpdate(companyId,req.body,{new:true})
return res.status(200).json({msg:"company updated successfully",updatedCompany})
}

export const softDeleteCompany=async(req,res,next)=>{
    const{companyId}=req.params
if(!req.user)return next(new Error("must login first",{cause:400}))
    const company=await Companymodel.findById(companyId)
if(!company)return next(new Error("company is not found or  deleted",{cause:400}))
console.log( company.CreatedBy.toString()
);
console.log(req.user._id.toString());

    if(req.user.role !== roles.admin && company.CreatedBy.toString() !== req.user._id.toString())return next(new Error("you are not allwed",{cause:400}))
        const companyDel=await Companymodel.findByIdAndUpdate(companyId,{isDeleted:true},{new:true}) 

    return res.status(200).json({msg:"soft deleted is done",companyDel})

}

export const getCompanyJob=async(req,res,next)=>{
    const{companyId}=req.params
    if(!req.user)return next(new Error("must login first",{cause:400}))
        const company=await Companymodel.findOne({_id:companyId,isDeleted:false}).populate("jobs")
    if(!company)return next(new Error("company is not found or  deleted",{cause:400}))
        return res.status(200).json({msg:"done",company})


}
export const searchCompany=async(req,res,next)=>{
    const{companyName}=req.query
    if(!req.user)return next(new Error("must login first",{cause:400}))
        const company=await Companymodel.findOne({companyName:companyName,isDeleted:false})
    if(!company)return next(new Error("company is not found or  deleted",{cause:400}))
        return res.status(200).json({msg:"done",company})


}


export const uploadLogo=async(req,res,next)=>{
    
    const{companyId}=req.params
    console.log(companyId);
    
    if(!req.user)return next(new Error("must login first",{cause:400}))
        const company=await Companymodel.findById(companyId)
    if(!company)return next(new Error("company is not found or  deleted",{cause:400}))
        if(req.user._id.toString()!== company.CreatedBy.toString())return next("you are not allwed",{cause:400})
        const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`job app/company/${company.cloudfolder}/logo`})
company.Logo={secure_url,public_id}
company.save()
        return res.status(200).json({msg:"done",company})


}


export const uploadCover=async(req,res,next)=>{
    
    const{companyId}=req.params
    if(!req.user)return next(new Error("must login first",{cause:400}))
        const company=await Companymodel.findById(companyId)
    if(!company)return next(new Error("company is not found or  deleted",{cause:400}))
        if(req.user._id.toString()!== company.CreatedBy.toString())return next("you are not allwed",{cause:400})
        const{secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`job app/company/${company.cloudfolder}/cover`})
company.coverPic={secure_url,public_id}
console.log(company.coverPic);

company.save()
        return res.status(200).json({msg:"done",company})


}


export const deleteLogo=async(req,res,next)=>{
    
   const{companyID}=req.params
    console.log(companyID);
    
    if(!req.user)return next(new Error("must login first",{cause:400}))
        const company=await Companymodel.findById(companyID)
    if(!company)return next(new Error("company is not found or  deleted",{cause:400}))
        if(req.user._id.toString()!== company.CreatedBy.toString())return next("you are not allwed",{cause:400})
        const results=await cloudinary.uploader.destroy(company.Logo.public_id)

if (results.result == "ok") {
company.Logo={secure_url:defaultcloudpic.secureurlDefault,public_id:defaultcloudpic.publicidDefault}
company.save()    
}


        return res.status(200).json({msg:"done",company})


}


export const deleteCover=async(req,res,next)=>{
    
    const{companyID}=req.params
     console.log(companyID);
     
     if(!req.user)return next(new Error("must login first",{cause:400}))
         const company=await Companymodel.findById(companyID)
     if(!company)return next(new Error("company is not found or  deleted",{cause:400}))
         if(req.user._id.toString()!== company.CreatedBy.toString())return next("you are not allwed",{cause:400})
         const results=await cloudinary.uploader.destroy(company.coverPic.public_id)
 console.log(company.coverPic.public_id);
 
 if (results.result == "ok") {
 company.coverPic={secure_url:defaultcloudpic.secureurlDefault,public_id:defaultcloudpic.publicidDefault}
 company.save()    
 }
 
 
         return res.status(200).json({msg:"done",company})
 
 
 }
 export const addHr=async(req,res,next)=>{
    
    const{companyID}=req.params
    const{newHr}=req.body
     console.log(companyID);
     
     if(!req.user)return next(new Error("must login first",{cause:400}))
        const company=await Companymodel.findById(companyID)
     if(!company)return next(new Error("company is not found or  deleted",{cause:400}))
        if(req.user._id.toString()!== company.CreatedBy.toString())return next("you are not allwed",{cause:400})

         const added=await Companymodel.findByIdAndUpdate(companyID,{HRs:newHr},{new:true})

           
     return res.status(200).json({msg:"done",added})

 }