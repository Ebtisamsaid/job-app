import { allCompany, alluser } from "./resolve.js";
import { allcompanyType, alluserType } from "./types.js";

export const adminQuery={

    allusers:{
        type:alluserType ,
        resolve:alluser ,
    },
    allcompany:{
        type:allcompanyType ,
        resolve:allCompany ,
    }
}