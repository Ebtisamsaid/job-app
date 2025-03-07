import { Router } from "express"
import { isAuthentecated } from "./middleware/authentication.middleware.js"
import { isAuthorized } from "./middleware/authorization.middleware.js"
import { userendpoint } from "./endpoints.js"
import asynchandler from "./utils/errorhandling/asynchandler.js"
import Companymodel from "./DB/model/company/company.model.js"
import ExcelJS from "exceljs";
import Application from "./DB/model/applicationmodel/application.model.js"

export const excel=async(req,res,next)=>{

const {companyName,date}=req.body
const {companyId}=req.params
console.log(companyId);

   if(!req.user)return next(new Error("must login first",{cause:400}))
        const company=await Application.findOne({companyId:companyId}).populate([{path:"company"},{path:"userId"}])
    
    if(!company)return next(new Error("company is not found or  deleted",{cause:400}))
        // if (!company || company.application.length === 0) {
        //     return next({ message: "Company not found or no applications for the given date", cause: 404 });
        //   }
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Applications Report");
        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Applicant Name", key: "name", width: 30 },
            { header: "Position", key: "position", width: 20 },
            { header: "Application Date", key: "date", width: 20 },
          ];

        return res.status(200).json({msg:"done",company})

}

export const bounceRouter= Router()
bounceRouter.post("/:companyId",isAuthentecated,isAuthorized(userendpoint.excel),asynchandler(excel))
