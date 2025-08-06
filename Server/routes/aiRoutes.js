import express from "express"
import { auth } from "../middleware/auth.js"
import { blogtitle, genratearticle, genrateimage, removebackround, removeobject, reviewresume } from "../controller/ai_controller.js"
import { upload } from "../config/multer.js"

const airouter = express.Router()

airouter.post("/genrate-article", auth, genratearticle)
airouter.post("/genrate-blog", auth, blogtitle)
airouter.post("/genrate-image", auth, genrateimage)
airouter.post("/remove-image-background", upload.single("image"),  auth, removebackround)
airouter.post("/remove-image-object", upload.single("image"),  auth, removeobject)
airouter.post("/review-resume", upload.single("resume"),  auth, reviewresume)





export default airouter