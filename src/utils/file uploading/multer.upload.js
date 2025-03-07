import multer, { diskStorage } from "multer"


export const uploudcloud=()=>{
    const storage=diskStorage({})
    const multeruploud=multer({storage})
    return multeruploud
}
