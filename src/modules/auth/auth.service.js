import User from "../../DB/model/user/user.model.js"
import { ciphertext, decrypt } from "../../utils/encryption/encrypt.js"
import { compare, hash } from "../../utils/hash/hash.js"
import { eventEmitter } from "../../utils/sendEmail/email.event.js"

import Randomstring  from "randomstring"
import { generateToken, verifyToken } from "../../utils/token/token.js"
import { sendEmails } from "../../utils/sendEmail/sendEmail.js"
import { generateUrl } from "../../utils/sendEmail/generateUrl.js"
import {providers} from "../../endpoints.js"
import {OAuth2Client}  from 'google-auth-library';
export const register=async(req,res,next)=>{
 
    const{lastName,firstName,mobileNumber,password,email,role,OTP,DOB,gender}=req.body
  const user =await User.findOne({email})

    if(user)return next(new Error("email is already exist ",{cause:400}))
        
         const userData= await User.create({
        firstName,lastName,email,password,mobileNumber,gender,DOB,providers:providers.system,
 
    })
    const otp=Randomstring.generate({length:4,charset:'alphanumeric'})
    const hashOTP= await hash({plaintetxt:otp})

    eventEmitter.emit("otpEmail",{email,otp})
    const addotp= await User.updateOne({email},{$push:{OTP:[{code:hashOTP},{type:"confirmEmail"},{expiresIn:Date.now()+1000*60*10}]}})


        return res.status(200).json({
success:true,message:"user created successfully",userData})

}
export const confirmOTP=async(req,res,next)=>{
const { OTP ,email}=req.body
const user =await User.findOne({email,isConfirmed:false})
if(!user)return next(new Error ("email is alredy exist or confirmed",{cause:400}))
 
 
    const confirmOtp=  user.OTP.find(  (item)=>  {return item.code })
if (!confirmOtp) return next ( new Error (" otp not found"))
   
   
    const expireInOTP= user.OTP.find(  (item)=>  {return item.expiresIn }) 
    if( expireInOTP.expiresIn < Date.now())return next (new Error ("otp is expire"))
        
        if(! await compare({plaintetxt:OTP,hash:confirmOtp.code}))return next (new Error("OTP not match"))
        
const typeOTP=user.OTP.find(  (item)=>  {return item.type })
       if(typeOTP.type !== "confirmEmail") return next (new Error ("plz enter confirmEmail OTP"))
            
        await User.updateOne({email},{$set:{isConfirmed:true}})
    return res.status(200).json({success:true,result:"email confirmed"})


}
export const resendOTP=async(req,res,next)=>{
    const{email}=req.body
    const user = await User.findOne({email,isConfirmed:false})

  
    
   if (!user) return next (new Error ("email is confirmed or is already exist"))
    const otp =Randomstring.generate({length:4,charset:"alphanumeric"})
    const hashedOTP = await hash({plaintetxt:otp})

    const otpType=user.OTP.find((item)=>{return item.type}).type
    if(otpType == "confirmEmail")
  {  
    eventEmitter.emit("otpEmail",{email,otp})
    
    await User.updateOne({email},{OTP:[{code:""},{type:"confirmEmail"},{expiresIn:Date.now()+1000*60*10}]})
    
    await User.findOneAndUpdate({email},{OTP:[{code:hashedOTP},{type:"confirmEmail"},{expiresIn:Date.now()+1000*60*10}]})
 
}if (otpType == "forgetPassword") {
    eventEmitter.emit("forgetPassword",{email,otp})
    
    await User.updateOne({email},{OTP:[{code:""},{type:"forgetPassword"},{expiresIn:Date.now()+1000*60*10}]})
    
    await User.findOneAndUpdate({email},{OTP:[{code:hashedOTP},{type:"confirmEmail"},{expiresIn:Date.now()+1000*60*10}]})
 
  
}
 
 
    return res.status(200).json({msg:"resend OTP success"})
    
}
export const login =async(req,res,next)=>{
    const{email,password}=req.body
    const user =await User.findOne({email,isConfirmed:true,providers:providers.system,isDelete:false,bannedAt:null})
    if(!user) return next(new Error("user not found or not confirm"))
        if( ! await compare({plaintetxt:password,hash:user.password})) return next(new Error ("password not match"))
const access_token=generateToken({payload:{email:user.email,id:user._id},options:{expiresIn:process.env.access_token_expire}})
const refresh_token=generateToken({payload:{email:user.email,id:user._id},options:{expiresIn:process.env.refresh_token_expire}})
            return res.status(200).json({msg:"login successfully",access_token,refresh_token})
        }
      export  const forgetPassword=async(req,res,next)=>{
            const{email}=req.body
            const user =await User.findOne({email,isConfirmed:true})
            if(!user) return next(new Error("user is not found"),{cause:400})
                const otp =Randomstring.generate({length:4,charset:"alphanumeric"})
            const hashedOTP = await hash({plaintetxt:otp})
        
            
             
            eventEmitter.emit("forgetPassword",{email,otp})
            
            await User.updateOne({email},{OTP:[{code:""},{type:""},{expiresIn:""}]})

            
            await User.findOneAndUpdate({email},{OTP:[{code:hashedOTP},{type:"forgetPassword"},{expiresIn:Date.now()+1000*60*10}]})
         
        
        return res.status(200).json({msg:"forgetpassword OTP send "})

    }
    export const resetPassword=async(req,res,next)=>{
        const{newPassword,email ,OTP}=req.body
        const user=await User.findOne({email,isDelete:false,isConfirmed:true})
        if(!user) return next(new Error("user not found",{cause:400}))
     const confirmOTP=  user.OTP.find((item)=>{return item.code})
     const confirmexpireOTP=  user.OTP.find((item)=>{return item.expiresIn})
if(!confirmOTP)return next(new Error("OTP not found"))
    if(confirmexpireOTP.expiresIn < Date.now())return next(new Error("OTP is expire",{cause:400}))
    if(!await compare({plaintetxt:OTP,hash:confirmOTP.code}))return next (new Error("OTP not match",{cause:400}))
        if(await compare({plaintetxt:newPassword,hash:user.password}))return next (new Error("newPassword is the same old one",{cause:400}))
const hashedPassword=await hash({plaintetxt:newPassword})
await User.updateOne({_id:user._id},{password:hashedPassword,changePasswordAt:Date.now(),OTP:{code:""}})
   
return res.status(200).json({msg:"done"})

}


export const gmailLogin=async(req,res,next)=>{
    const{idToken}=req.body
const client = new OAuth2Client();
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: "304656150356-dtcpo6ls2f0v7morl8kg0o4avpov3h59.apps.googleusercontent.com",
      //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If the request specified a Google Workspace domain:
  // const domain = payload['hd'];
  return payload
 
}
const userData=await verify()
const{verified_email,email,name,picture}=userData

let user=await User.findOne({email})
if(!user){
    user=await User.create({email ,firstName:name,profilePic:picture,isConfirmed:true ,providers:providers.google})
}
const access_token=generateToken({payload:{id:user._id,email:user.email},options:process.env.access_token_expire})
const refresh_token=generateToken({payload:{id:user._id,email:user.email},options:process.env.refresh_token_expire})
return res.status(200).json({msd:"logingmail done",refresh_token,access_token})
}


export const refreshtoken=async(req,res,next)=>{
    const{authorization}=req.headers

 
    if(!authorization)return next(new Error("error format"))
        const token = authorization.split(" ")[1]
  
    
    const userData = await verifyToken(token)
    if(!userData) return next(new Error ("user not found",{cause:400}))


        const accesstoken=await generateToken({payload:{email:userData.email},options:{expiresIn:process.env.access_token_expire}})
    return res.status(200).json({msg:"done",accesstoken})
}
// export const  sendOtp=async(req,res,next)=>{
//     const {email}=req.body
//     const user=await User.findOne({email})
//     if(user)return next(new Error ("email is already exist",{cause:400}))

// const otp=Randomstring.generate({length:4,charset:'alphanumeric'})
// const savedotp=await Otp.create({email,otp})

// eventEmitter.emit("sendEmail",email,otp,{subject:subject.register, html:generatehtml(otp)})
// return res.status(200).json({message:"send otp successfully"})
// }
// export const login =async(req,res,next)=>{
//     const {email,password}=req.body
//     const user=await User.findOne({email})
//     if(!user) return next (new Error (" invalid email",{cause:400}))
//         if(!user.isAcctivate) return next(new Error ("you must acctivate your account first",{cause:400}))
// const match=await compare({plaintetxt:req.body.password,hash:user.password})
//     if(!match)  return next(new Error ("password  Incorrect",{cause:400}))
//         const access_token = generateToken({payload:{email:user.email,id:user._id},options:{expiresIn:process.env.access_token_expire}})
//         const refresh_token = generateToken({payload:{email:user.email,id:user._id},options:{expiresIn:process.env.refresh_token_expire}})
// return res.status(200).json({success:true,message:"login is successfully",access_token:access_token,refresh_token:refresh_token})
//         }
// // refresh-token
// export const newAccess=async(req,res,next)=>{
//     const {refresh_token}=req.body
//     console.log(refresh_token);
    
//     const payload=verifyToken(refresh_token)
//     const user=await User.findById(payload.id)
//     if(!user)return next(new Error ("user not found",{cause:400}))
//         if(parseInt(user.changePasswordAt.getTime /1000)>payload.iat ) { next(new Error ("invalid refresh token"))}else{
//              next(new Error ("the refresh token was issued before the password was updated, plz login again"))
//         }
//         const access_token=generateToken({payload:{id:user._id},options:{expiresIn:process.env.access_token_expire}})
//     return res.status(200).json({success:true,result:access_token})

// }

// export const forgetpassword=async(req,res,next)=>{
//     const{email}=req.body
//     const user=await User.findOne({email,isAcctivate:true,isDelete:false})
//     if(!user) return next(new Error ("email invalid",{cause:400}))
//         const otp =Randomstring.generate({length:4,charset:"alphanumeric"})
//     const saveOtp=await Otp.create({email,otp})
//     eventEmitter.emit("sendEmail",email,otp,{subject:subject.resetPass, html:generatehtml(otp)})
//     return res.status(200).json({success:true,message:"otp send successfully "})
// }







//         export const resetPassword=async(req,res,next)=>{
//             const {email,password,otp}=req.body
// const user =await User.findOne({email,isAcctivate:true,isDelete:false}
// )
// if(!user)return  next(new Error ("email invalid",{cause:400}))
// const checkOtp=await Otp.findOne({email,otp})
// if(!checkOtp)return next(new Error ("otp is invalid",{cause:400}))
//     user.password=hash({plaintetxt:password})
// await user.save()
// return res.status(200).json({message:"reset password done try to login",success:true


// })
//         }


//         export const freeze=async(req,res,next)=>{
//             const user =await User.findByIdAndUpdate(req.user._id,{isDelete:true},{new:true})
//             return res.status(200).json({success:true,user})
//         }

//         export const gmailLogin=async(req,res,next)=>{
//             const{idToken}=req.body
//             const client = new OAuth2Client()
//             async function verify() {
//                 const ticket = await client.verifyIdToken({
//                     idToken: idToken,
//                     audience: process.env.client_id  // Specify the WEB_CLIENT_ID of the app that accesses the backend
//                     // Or, if multiple clients access the backend:
//                     //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
//                 });
//                 const payload = ticket.getPayload();
//                 const userid = payload['sub'];
//                 // If the request specified a Google Workspace domain:
//                 // const domain = payload['hd'];
//                 return payload
//               }
//               const userData=await verify()
//               const {email_verified,email,picture,name}=userData
//               if(!email_verified)return next(new Error ("email not found",{cause:400}))
//                 const user = await User.create({email,userName:name,isAcctivate:true,provider:providers.google})
//             if(!user)return next(new Error("user is not created",{cause:400}))

//                 const access_token=generateToken({payload:{email:user.email,id:user._id},options:{expiresIn:process.env.access_token_expire}})
//                 const refresh_token=generateToken({payload:{email:user.email,id:user._id},options:{expiresIn:process.env.refresh_token_expire}})

// return res.status(200).json({success:true,results:{refresh_token:refresh_token,access_token:access_token}})
//         }


//         export const updateEmail=async(req,res,next)=>{
//             const{email,password}=req.body
//             const user=await User.findById(req.user._id)
//             if(!compare({plaintetxt:password,hash:user.password})) return next(new Error("password not match",{cause:400}))
// user.TempEmail=email
//             await user.save()
//             const token=generateToken({payload:{email,id:user._id}})
//             const url=`http:localhost:4000/verify-email/${token}`
//             sendEmails({to:email,subject:subject.verifyEmail,html:generateUrl(url)})
//             return res.status(200).json({success:true,message:"verify your email"})
//         }
//         export const verifyEmail=async(req,res,next)=>{
//             const {token}=req.params
//             const{email,id}=verifyToken(token)
//             const user=await User.findById(id)
//             if(!user) return next(new Error("user not found",{cause:400}))
//                 user.email=user.TempEmail
//             user.TempEmail=null
//             user.save()
//             return res.status(200).json({success:true,message:"verify email successfully"})
//         }
        // export const updatePassword=async(req,res,next)=>{
        //     const {old_password,new_password}=req.body
        //     if(!compare({plaintetxt:old_password,hash:user.password}))return next(new Error("old password incorresct",{cause:400}))
        //     const user=await User.findByIdAndUpdate(user._id,{password:hash({plaintetxt:new_password}),changePasswordAt:Date.now()})

        // }