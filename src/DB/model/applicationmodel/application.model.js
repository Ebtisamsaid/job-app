import {Schema} from "mongoose"
import mongoose, { Types } from 'mongoose';
import { pagination } from "../job opportunity/job.model.js";
export const status={
    pending:"pending",
    accepted:"accepted",
    viewed:"viewed",
    in_consideration:"in consideration" ,
    rejected:"rejected"



}

const applicationSchema=new Schema({

     jobId :{type:Types.ObjectId,ref:"Job"},
 userId :{type:Types.ObjectId,ref:"user"},
 companyId :{type:Types.ObjectId,ref:"company"},
userCV :{secure_url:String,public_id:String},
 status:{type:String,enum:Object.values(status),default:status.pending}

},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})
applicationSchema.virtual('company', {
    ref: 'Companymodel',
    localField: 'companyId',
    foreignField: '_id',
  });

applicationSchema.plugin(pagination)
const Application= mongoose.model("application",applicationSchema)
export default Application