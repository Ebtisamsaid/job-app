import { Router } from "express";
import { isAuthentecated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import * as adminService from "./admin.service.js"
import * as adminValidaion from "./admin.validation.js"
import { userendpoint } from "../../endpoints.js";
import validation from "../../middleware/validation.middleware.js";
import asynchandler from "../../utils/errorhandling/asynchandler.js";

const router =Router()
router.post("/:userId/banned-unbanned/user",isAuthentecated,isAuthorized(userendpoint.bannedUnbannedUser),validation(adminValidaion.bannedUnbannedUser),asynchandler(adminService.bannedUnbannedUser))
router.post("/:companyId/banned-unbanned/company",isAuthentecated,isAuthorized(userendpoint.bannedUnbannedCompany),validation(adminValidaion.bannedUnbannedCompany),asynchandler(adminService.bannedUnbannedCompany))
router.post("/:companyId/approve-company",isAuthentecated,isAuthorized(userendpoint.approveCompany),validation(adminValidaion.approveCompany),asynchandler(adminService.approveCompany))


export default router