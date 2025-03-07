import { Router } from "express";
import asynchandler from "../../utils/errorhandling/asynchandler.js";
import {isAuthentecated} from "../../middleware/authentication.middleware.js"
import  {isAuthorized} from "../../middleware/authorization.middleware.js"
import validation from "../../middleware/validation.middleware.js"
import * as companyService from "./company.service.js"
import * as companyValidation from "./company.validation.js"
import { uploudcloud } from "../../utils/file uploading/multer.upload.js";
import { userendpoint } from "../../endpoints.js";

const router=Router()

router.post("/add-company",isAuthentecated,isAuthorized(userendpoint.addcompany),uploudcloud().single("legalAttachment"),validation(companyValidation.addCompany),asynchandler(companyService.addCompany))
router.patch("/update-company/:companyId",isAuthentecated,isAuthorized(userendpoint.updateCompany),validation(companyValidation.updateCompany),asynchandler(companyService.updateCompany))
router.patch("/soft-delete/:companyId",isAuthentecated,isAuthorized(userendpoint.softDeleteCompany),validation(companyValidation.softDeleteCompany),asynchandler(companyService.softDeleteCompany))
router.get("/:companyId",isAuthentecated,isAuthorized(userendpoint.getCompanyJob),validation(companyValidation.getCompanyJob),asynchandler(companyService.getCompanyJob))
router.get("/",isAuthentecated,isAuthorized(userendpoint.searchCompany),asynchandler(companyService.searchCompany))
 router.post("/upload-logo/:companyId",isAuthentecated,isAuthorized(userendpoint.uploadLogo),uploudcloud().single("logo"),validation(companyValidation.uploadLogo),asynchandler(companyService.uploadLogo))


 router.delete("/delete-logo/:companyID",isAuthentecated,isAuthorized(userendpoint.deleteLogo),validation(companyValidation.deleteLogo),asynchandler(companyService.deleteLogo))
 router.delete("/delete-cover/:companyID",isAuthentecated,isAuthorized(userendpoint.deleteCover),validation(companyValidation.deleteCover),asynchandler(companyService.deleteCover))
 router.post("/upload-cover/:companyId",isAuthentecated,isAuthorized(userendpoint.uploadCover),uploudcloud().single("cover"),validation(companyValidation.uploadCover),asynchandler(companyService.uploadCover))
 router.post("/add-hr/:companyID",isAuthentecated,isAuthorized(userendpoint.addHr),validation(companyValidation.addHr),asynchandler(companyService.addHr))
export default router