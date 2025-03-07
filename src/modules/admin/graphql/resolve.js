import Companymodel from "../../../DB/model/company/company.model.js";
import User from "../../../DB/model/user/user.model.js";

export const alluser=async()=>{

  return await User.find()


}

export const allCompany=async()=>{

    return await Companymodel.find()
  
  
  }