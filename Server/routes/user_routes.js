import express from "express"
import { auth } from "../middleware/auth.js"
import { getpubishcreation, getusercreation, togglelikecreation } from "../controller/user_controller.js"

  const userrouter = express.Router()


userrouter.get("/get-user-creation", auth, getusercreation)
userrouter.get("/get-published-creation", auth, getpubishcreation)
userrouter.post("/toggled-liked-creation", auth, togglelikecreation)

export default userrouter

 