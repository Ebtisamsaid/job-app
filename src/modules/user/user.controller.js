import { Router } from "express";
import * as userService from "./user.service.js"
import { isAuthentecated } from "../../middleware/authentication.middleware.js";
import asynchandler from "../../utils/errorhandling/asynchandler.js"
import {isAuthorized} from "../../middleware/authorization.middleware.js"
import { userendpoint } from "../../endpoints.js";
import validation from "../../middleware/validation.middleware.js";
import *  as uservalidation from "./user.validation.js"
import { uploudcloud } from "../../utils/file uploading/multer.upload.js";
 const router=Router()
 router.patch("/profile/update",isAuthentecated,isAuthorized(userendpoint.updateProfile),validation(uservalidation.updateprofilevalidation),asynchandler(userService.updateprofile))
 router.get("/get-profile",isAuthentecated,isAuthorized(userendpoint.getProfile),asynchandler(userService.getProfile))
 router.get("/get-profile/:id",isAuthentecated,isAuthorized(userendpoint.getUserProfile),validation(uservalidation.getUserProfile),asynchandler(userService.getUserProfile))
 router.patch("/update-password",isAuthentecated,isAuthorized(userendpoint.updatePassword),validation(uservalidation.updatePassword),asynchandler(userService.updatePassword))
 router.post("/profile-picture",isAuthentecated,isAuthorized(userendpoint.profilePic),validation(uservalidation.profilePic),uploudcloud().single("image"),asynchandler(userService.profilePic))
 router.post("/cover-picture",isAuthentecated,isAuthorized(userendpoint.profilePic),validation(uservalidation.uploadcoverpic),uploudcloud().single("image"),asynchandler(userService.uploadcoverpic))
 router.delete("/del-profile-picture",isAuthentecated,isAuthorized(userendpoint.profilePic),asynchandler(userService.deleteprofilepic))
 router.delete("/del-cover-picture",isAuthentecated,isAuthorized(userendpoint.profilePic),asynchandler(userService.deletecoverepic))
 router.patch("/delete-account",isAuthentecated,isAuthorized(userendpoint.profilePic),asynchandler(userService.softDelete))


export default router