import { Router } from "express";
import * as jobService from "./job.service.js"
import * as jobvalidation from "./job.validation.js"
import { isAuthentecated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js";
import validation from "../../middleware/validation.middleware.js";
import asynchandler from "../../utils/errorhandling/asynchandler.js";
import { userendpoint } from "../../endpoints.js";
const router=Router({mergeParams:true})

router.post("/add-job/:companyId",isAuthentecated,isAuthorized(userendpoint.addjobs),validation(jobvalidation.addJob),asynchandler(jobService.addJob))
router.patch("/update-job/:jobId",isAuthentecated,isAuthorized(userendpoint.updateJob),validation(jobvalidation.updateJob),asynchandler(jobService.updateJob))
router.delete("/delete-job/:jobId",isAuthentecated,isAuthorized(userendpoint.deleteJob),validation(jobvalidation.deleteJob),asynchandler(jobService.deleteJob))
router.get("/",isAuthentecated,isAuthorized(userendpoint.getAlljobs),validation(jobvalidation.getAlljobs),asynchandler(jobService.getAlljobs))
router.get("/filter-job",isAuthentecated,isAuthorized(userendpoint.filtersJob),asynchandler(jobService.filtersJob))
router.get("/all-cv/:jobId",isAuthentecated,isAuthorized(userendpoint.getAllapplication),validation(jobvalidation.getAllapplication),asynchandler(jobService.getAllapplication))
export default router