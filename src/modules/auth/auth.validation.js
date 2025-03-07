import Joi from "joi";
import { gender, roles } from "../../endpoints.js";

export const registervalidation=Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    mobileNumber:Joi.string().required(),
email:Joi.string().email().required(),
role:Joi.valid(...Object.values(roles)),
gender:Joi.valid(...Object.values(gender)),
password:Joi.string().required(),
DOB:Joi.string().required(),
confirmPassword :Joi.string().valid(Joi.ref("password")).required(),

}).required()

export const confirmOTP=Joi.object({
    email:Joi.string().email().required(),
    OTP:Joi.string().required()
}).required()

export const resendOTP=Joi.object({
    email:Joi.string().email().required(),

}).required()
export const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
}).required()


export const forgetpasswordSchema=Joi.object({
    email:Joi.string().email().required()

})

export const resetPasswordSchema=Joi.object({
    newPassword:Joi.string().required(),
    confirmPassword:Joi.string().valid(Joi.ref("newPassword")).required(),
email:Joi.string().email().required(),
  OTP:Joi.string().required()
}).required()

export const gmailLoginvalidation=Joi.object({
    idToken:Joi.string().required()
})






// export const refreshtoken = Joi.object({
//     refresh_token:Joi.string().required()
// }).required()


export const updateEmailvalidation=Joi.object({
    password:Joi.string().required(),
    email:Joi.string().email().required(),
}).required()
export const verifyEmail=Joi.object({
    token:Joi.string().required()
})
// export const updatePassword=Joi.object({
//     old_password:Joi.string().required(),
//     new_password:Joi.string().required(),
//     confirm_password:Joi.string().valid(Joi.ref("new_password")).required()
// }).required()