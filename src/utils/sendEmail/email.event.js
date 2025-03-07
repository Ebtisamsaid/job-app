import EventEmitter from "events";
import { sendEmails } from "./sendEmail.js";
import { generatehtml } from "./generatehtml.js";
import { subject } from "../../endpoints.js";
import Randomstring  from "randomstring"
 export const eventEmitter=new EventEmitter()
 eventEmitter.on("otpEmail",async({email,otp})=>{
    sendEmails({
        to:email,
        html:generatehtml(otp),
        subject:subject.register
    })


 })
 eventEmitter.on("forgetPassword",async({email,otp})=>{
    sendEmails({
        to:email,html:generatehtml(otp),subject:subject.forgetPassword
    })
 })
 eventEmitter.on("acceptApplication",async({email})=>{
    sendEmails({
        to:email,html:`<p style="font-size:50px;">your application is accepted</p>`,subject:"accepte apllication"
    })
 })
 eventEmitter.on("rejectApplication",async({email})=>{
    sendEmails({
        to:email,html:`<p style="font-size:50px;">your application is rejected</p>`,subject:"reject apllication"
    })
 })