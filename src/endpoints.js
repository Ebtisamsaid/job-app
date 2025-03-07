export const roles={
    user:"user",
    admin:"admin"
}
export const providers={
    system:"system",
    google:"google"
}
export const gender={
    male:"male",
    female:"female"
}
export const defaultcloudpic={
    publicidDefault:"jop app/users/pics/67c5b2ca91d42485d3b98b3f/profile pic/xhhxqohorsulnq5ldlms",
    secureurlDefault:"https://res.cloudinary.com/dt99ajmby/image/upload/v1741095489/jop%20app/users/pics/67c5b2ca91d42485d3b98b3f/profile%20pic/xhhxqohorsulnq5ldlms.jpg"
}
export const defaultcoverpic={
    publicidDefault:"jop app/users/pics/67c5b2ca91d42485d3b98b3f/cover pic/ken2z2nnrl2cbv0dqmxm",
    secureurlDefault:"https://res.cloudinary.com/dt99ajmby/image/upload/v1741097479/jop%20app/users/pics/67c5b2ca91d42485d3b98b3f/cover%20pic/ken2z2nnrl2cbv0dqmxm.jpg"
}
 
export const enumNumberOfempolyee={
   ONE_TO_TWENY:"1-20 empolyees",
   TWENY_ONE_TO_THIRTY:"21-30 empolyees",
   THIRTY_ONE_TO_40 :"31-40 empolyees",
}
export const jobLocation={
    onsite:"onsite",
    remotely:"remotely",
    hybrid:"hybrid"

}
export const workingTime={
    part_time :"part-time",
    full_time:"full-time",


}
export const seniorityLevel={
    fresh :"fresh",
    Junior :"Junior",
    Mid_Level:"Mid-Level",
    Senior:"Senior",
    Team_Lead:"Team-Lead",
    CTO:"CTO",



}
export const technicalSkills={
    nodejs :"nodejs",
    PHP :"PHP",
    typescript:"Mid-typescript",

}
export const softSkills={
    time_management :" time management",
    team_worker :"team worker",
  

}

export const subject={
  register:"acctivate account",
  resetPass:"reset-password",
  verifyEmail:"verify-email",
  resendOTP:"resen-dOTP",
  forgetPassword:"forgetPassword"
}


export const userendpoint={
    profilepic:[roles.user],
    delprofilepic:[roles.user],
    profilepic2:[roles.user],
    delprofilepic2:[roles.user],
    updateProfile:[roles.user],
    getProfile:[roles.user],
    getUserProfile:[roles.user],
    updatePassword:[roles.user],
    profilePic:[roles.user],
    addcompany:[roles.user],
    updateCompany:[roles.user],
    softDeleteCompany:[roles.admin,roles.user],
    getCompanyJob:[roles.admin,roles.user],
    searchCompany:[roles.admin,roles.user],
    uploadLogo:[roles.user],
    uploadCover:[roles.user],
    deleteLogo:[roles.user],
    deleteCover:[roles.user],
    addHr:[roles.user],
    addjobs:[roles.user],
    updateJob:[roles.user],
    deleteJob:[roles.user],
    getAlljobs:[roles.user],
    filtersJob:[roles.user],
    addCV:[roles.user],
    getAllapplication:[roles.user],
    accepted:[roles.user],
    rejected:[roles.user],
    bannedUnbannedUser:[roles.admin],
    bannedUnbannedCompany:[roles.admin],
    approveCompany:[roles.admin],
    excel:[roles.user],
}