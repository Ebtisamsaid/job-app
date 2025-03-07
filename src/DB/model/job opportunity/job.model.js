import {Schema} from "mongoose"
import mongoose, { Model, Types } from "mongoose"

import { jobLocation, seniorityLevel, workingTime } from "../../../endpoints.js"

const jobSchema=new  Schema({


     jobTitle :String,
 jobLocation :{type:String,enum:Object.values(jobLocation),required:true},
 workingTime :{type:String,enum:Object.values(workingTime),required:true},
 seniorityLevel : {type:String,enum:Object.values(seniorityLevel),required:true},
 jobDescription :{type:String,required:true},
 technicalSkills :{type:[String],required:true},
 softSkills :{type:[String],required:true},

 addedBy :{type:Types.ObjectId,ref:"user"},
 updatedBy:{type:Types.ObjectId,ref:"user"},
 closed :{type:Boolean,default:false},
 companyId:{type:Types.ObjectId,ref:"company"}



},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})
export const pagination=(schema)=>{
   
    schema.query.paginate=async function(page,limit,skip){
        // const limit =5
        // const skip=limit*(page-1)
        console.log(page);
        
        const data=await this.skip(skip).limit(limit)
        console.log(data);
        
        const items=await this.model.countDocuments()
return {data,currentPage:Number(page),ToltalItems:items,totalPage:Math.ceil(items/limit),itemPerPage:data.length}
    }
}
jobSchema.plugin(pagination)
jobSchema.virtual("application",{
    ref:"application",localField:"_id",foreignField:"jobId"
})




const Jobmodel=mongoose.model("Job",jobSchema)
export default Jobmodel