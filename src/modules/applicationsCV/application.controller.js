import { Router } from "express";
import { isAuthentecated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import validation from "../../middleware/validation.middleware.js";
import asynchandler from "../../utils/errorhandling/asynchandler.js";
import * as appServive from "./application.service.js"
import * as appvalidation from "./application.validation.js"
import { userendpoint } from "../../endpoints.js";
import {uploudcloud} from "../../utils/file uploading/multer.upload.js"

const router=Router()
router.post("/add-cv/:jobId",isAuthentecated,isAuthorized(userendpoint.addCV),uploudcloud().single("cv"),validation(appvalidation.addCV),asynchandler(appServive.addCV))
router.post("/accept/:jobId/:appId",isAuthentecated,isAuthorized(userendpoint.accepted),validation(appvalidation.accepted),asynchandler(appServive.accepted))
router.post("/reject/:jobId/:appId",isAuthentecated,isAuthorized(userendpoint.rejected),validation(appvalidation.rejected),asynchandler(appServive.rejected))
export default router