
import connectDB from "./DB/connection.js"
import authRouter from "./modules/auth/auth.controller.js"
import { globalhandlingerror } from "./utils/errorhandling/globalerror.js"
import { notfound } from "./utils/errorhandling/notfound.js"
import userRouter from "./modules/user/user.controller.js"
import jobRouter from "./modules/job/job.controller.js"
import companyRouter from "./modules/company/company.controller.js"
import applicationRouter from "./modules/applicationsCV/application.controller.js"
import adminRouter from "./modules/admin/admin.controller.js"
import bodyParser from 'body-parser';
import { schema } from "./modules/admin/admin.graphqlSchema.js"
import cors from "cors"
import dotenv from "dotenv"
import { createHandler } from 'graphql-http/lib/use/express'
import {bounceRouter} from "./bounce.js"
import { rateLimit } from 'express-rate-limit';
import helmet from "helmet"

const ratelimit = rateLimit({
    windowMs: 1 * 60 * 1000, 
    limit: 20,
    message: "Too many requests from this IP, please try again after 1 minute",
    handler: (req, res,next) => {
        return next(new Error('Too many requests from this IP, please try again after 1 minute',{cause: 429}));
    }
})
const Bootstrap=async(app,express)=>{

// parse
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(ratelimit);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
    
// connectDB
await connectDB()
// router
app.use('/auth',authRouter)
 app.use('/user',userRouter)
 app.use('/job',jobRouter)
 app.use('/company/:companyId/job',jobRouter)
 app.use('/company',companyRouter)
 app.use('/application',applicationRouter)
 app.use('/admin',adminRouter)
 app.use('/excel',bounceRouter)

app.use("/graphql",createHandler({schema,formatError:(error)=>{
    return{success:false,message:error.originalError?.message,statusCode:error.originalError?.cause ||500}
}}))
app.get('/', (req, res,next) => { return res.status(200).json({message:'Hello World!'})})
app.all("/*",notfound)
app.use(globalhandlingerror)

}
export default Bootstrap