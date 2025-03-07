import  { Router } from "express";
import * as authSchema from "./auth.validation.js"
import validation from "../../middleware/validation.middleware.js"
import asynchandler from "../../utils/errorhandling/asynchandler.js"
import * as authService from "./auth.service.js"
import { isAuthentecated } from "../../middleware/authentication.middleware.js";
const router=Router()
router.post("/register",validation(authSchema.registervalidation),asynchandler(authService.register))
router.post("/confirmOTP",validation(authSchema.confirmOTP),asynchandler(authService.confirmOTP))
router.post("/resendOTP",validation(authSchema.resendOTP),asynchandler(authService.resendOTP))
router.post("/login",validation(authSchema.loginSchema),asynchandler(authService.login))
router.post("/forgetPassword",validation(authSchema.forgetpasswordSchema),asynchandler(authService.forgetPassword))
router.post("/resetPassword",validation(authSchema.resetPasswordSchema),asynchandler(authService.resetPassword))
router.post("/gmailLogin",validation(authSchema.gmailLoginvalidation),asynchandler(authService.gmailLogin))



router.post("/refresh-token",isAuthentecated,asynchandler(authService.refreshtoken))
router.post("/gmailLogin",validation(authSchema.gmailLoginvalidation),asynchandler(authService.gmailLogin))
router.patch("/update-email",validation(authSchema.updateEmailvalidation),isAuthentecated,asynchandler(authService.updateEmail))
router.get("/verify-email/:token",validation(authSchema.verifyEmail),asynchandler(authService.verifyEmail))
// router.get("/updatePassword",isAuthentecated,validation(authSchema.updatePassword),asynchandler(authService.updatePassword))
export default router