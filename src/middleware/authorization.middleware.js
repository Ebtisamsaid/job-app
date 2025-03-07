import { roles } from "../endpoints.js"


export const isAuthorized=(endpoint)=>{
    return (req,res,next)=>{
        if(!endpoint.includes(req.user.role))
            
        // if(req.user.role !== roles.user)
            return next(new Error("you are not allowed",{cause:404}))
          return  next()
        
    }

}