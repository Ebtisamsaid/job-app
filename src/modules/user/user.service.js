
import User from "../../DB/model/user/user.model.js"

import cloudinary from "../../utils/file uploading/multer.cloudinary.config.js";
import { ciphertext, decrypt } from "../../utils/encryption/encrypt.js";
import { compare, hash } from "../../utils/hash/hash.js";
import { defaultcloudpic, defaultcoverpic } from "../../endpoints.js";

export const updateprofile=async(req,res,next)=>{
    const{mobileNumber, DOB ,firstName, lastName, gender}=req.body
    if(req.body.mobileNumber){
        req.body.mobileNumber=await ciphertext({encryptText:req.body.mobileNumber})
    }
    const user =await User.findByIdAndUpdate(req.user._id,req.body,{new:true}).lean().select("-OTP -password")

return res.status(200).json({msg:"updated done",...user,mobileNumber:await decrypt({ciphertext:req.body.mobileNumber})})
}
export const getProfile=async(req,res,next)=>{
   
if(!req.user) return next (new Error("you need to loggin first"))
   const  decryptPhone=await decrypt({ciphertext:req.user.mobileNumber})
    const userData= await User.findById(req.user._id,{mobileNumber:decryptPhone}).select("firstName lastName mobileNumber")
return res.status(200).json({msg:"done",userData})
}
export const getUserProfile=async(req,res,next)=>{
   const{id}=req.params
    const user= await User.findById(id).lean().select(" firstName lastName  mobileNumber coverPic profilePic")
   
    return res.status(200).json({msg:"done",...user,mobileNumber:await decrypt({ciphertext:user.mobileNumber})})
    }
    export const updatePassword=async(req,res,next)=>{
        const{oldPassword,newPassword}=req.body
        if(!req.user._id)return next(new Error("you must login first",{cause:400}))
         const compareOldpass=await compare({plaintetxt:oldPassword,hash:req.user.password})
        if(!compareOldpass) return next(new Error("old password is wrong",{cause:400}))
            const hashednewPass=await hash({plaintetxt:req.body.newPassword})
const updatedPass=await User.findByIdAndUpdate(req.user._id,{password:hashednewPass,changePasswordAt:Date.now()},{new:true})
         console.log(updatedPass.password);
         
        return res.status(200).json({msg:"done",updatedPass})
         }

         export const profilePic=async(req,res,next)=>{
            const user = await User.findById(req.user._id)
            if(!user) return next(new Error("user not found",{cause:400}))
       const{secure_url,public_id}=     await cloudinary.uploader.upload(req.file.path,{folder:`jop app/users/pics/${req.user._id}/profile pic`})
    console.log(secure_url,public_id);
    
user.profilePic={secure_url,public_id}
user.save()
return res.status(200).json({user})
         }
         export const deleteprofilepic=async(req,res,next)=>{
            const user = await User.findById(req.user._id)
            if(!user) return next(new Error("user not found",{cause:400}))
       const results=     await cloudinary.uploader.destroy(req.user.profilePic.public_id)
    if(results.result == "ok"){
        user.profilePic={secure_url:defaultcloudpic.secureurlDefault,public_id:defaultcloudpic.publicidDefault}
        user.save()

    }

return res.status(200).json({ msg:"profile picture is deleted",user})
         }

        

     export const uploadcoverpic=async(req,res,next)=>{
        const user = await User.findById(req.user._id)
            if(!user) return next(new Error("user not found",{cause:400}))
       const{secure_url,public_id}=     await cloudinary.uploader.upload(req.file.path,{folder:`jop app/users/pics/${req.user._id}/cover pic`})
user.coverPic={secure_url,public_id}
user.save()
return res.status(200).json({user})

     }    
     export const deletecoverepic=async(req,res,next)=>{
        const user = await User.findById(req.user._id)
        if(!user) return next(new Error("user not found",{cause:400}))
   const results=     await cloudinary.uploader.destroy(req.user.profilePic.public_id)
if(results.result == "ok"){
    user.coverPic={secure_url:defaultcoverpic.secureurlDefault,public_id:defaultcoverpic.publicidDefault}
    user.save()

}

return res.status(200).json({ msg:"cover picture is deleted",user})
     }
     export const softDelete=async(req,res,next)=>{
        const user =await User.findOne(req.user._id,{isDelete:false})
        if(!user)return next(new Error("user not found or deleted",{cause:400}))
       const deletedUser=     await User.findByIdAndUpdate(req.user._id,{isDelete:true},{new:true})
     return res.status(200).json({msg:"account soft deleted done ",deletedUser})
    }
// 
// export const profilepic= async(req,res,next)=>{
//     console.log( req.user);
    
//     const user=await User.findByIdAndUpdate(req.user._id,{profilepic:req.file.path},{new:true})
//     return res.status(200).json({success:true,result:user})
// }
// export const delprofilepic=async(req,res,next)=>{
//     const user=await User.findById(req.user._id)
//     const imgpath=path.resolve(".",user.profilepic)
//     fs.unlinkSync(imgpath)
//     user.profilepic=defaultpic
//    await  user.save()
//     return res.status(200).json({success:true,result:user})
// }




// add pic by cloudinary 
// export const profilepic2=async(req,res,next)=>{
//     const user =await User.findById(req.user._id)
//     const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`social app/users/${req.user._id}`})
//   user.profilepic2={secure_url,public_id}
//    await user.save()
//     return res.status(200).json({results:user})

// }
// export const delprofilepic2=async(req,res,next)=>{
//     const user =await User.findById(req.user._id)
//     const results =await cloudinary.uploader.destroy(user.profilepic2.public_id)
//     if (results.result == "ok"){
//         user.profilepic2={
//             secure_url:defaultcloudpic.secureurlDefault,
//             public_id:defaultcloudpic.publicidDefault
//         }
//     }
   
//     await user.save()
 
//     return res.status(200).json({results:user })

// }