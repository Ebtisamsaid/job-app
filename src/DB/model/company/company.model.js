import mongoose, { Schema, Types } from "mongoose";
import { enumNumberOfempolyee } from "../../../endpoints.js";


// schema
const companySchema=new Schema({
    companyName :{type:String,unique:true,required:true},
    description  :{type:String,required:true},
    industry   :{type:String,required:true},
    address:{type:String,required:true},
    numberOfEmployees :{type:String,enum:Object.values(enumNumberOfempolyee),required:true},

    companyEmail :{type:String,unique:[true,"email is already exist"],required:true},
    CreatedBy :{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    Logo :{secure_url:String,public_id:String},
    coverPic  :{secure_url:String,public_id:String},
    legalAttachment   :{secure_url:String,public_id:String},
    HRs :[{type:Types.ObjectId,ref:"user"}],
    bannedAt :{type:Date,default:null},
    deletedAt  :{type:Date},
    approvedByAdmin :{type:Boolean,default:false},
    isDeleted:{type:Boolean,default:false},
    cloudfolder:{type:String,unique:true},
    




},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})
companySchema.virtual("jobs",{
    ref:"job",
    localField:"_id",
    foreignField:"companyId"
})
companySchema.virtual("applications",{
    ref:"application",
    localField:"_id",
    foreignField:"companyId"
})

// model
const Companymodel=mongoose.model("company",companySchema)
export default Companymodel