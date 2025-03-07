import cron from "node-cron"
import User from "../DB/model/user/user.model.js";

const cleanUp=async()=>{

const users=await User.find()
for (const user of users) {
   
        if(user.OTP.length>0){
           const validOTPs= user.OTP.filter( async(item)=>{
                item.expiresIn>Date.now()
user.OTP=validOTPs
await user.save
            })

        }    

    
}


    cron.schedule('* */6 * * *', async() => {
        await cleanUp()
        console.log(' OTP Clean every 6 minutes');
      });
}