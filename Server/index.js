import express, { json } from "express"
import cors from "cors"
import "dotenv/config"
import { clerkMiddleware, requireAuth } from '@clerk/express'
import airouter from "./routes/aiRoutes.js"
import connectCloudinary from "./config/cloudnary.js"
import userrouter from "./routes/user_routes.js"


const app = express()

await connectCloudinary()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// public route
app.get("/", (req, res) => {
    res.send("server is live")
})

app.use(requireAuth())

app.use("/api/ai", airouter)
app.use("/api/user", userrouter)




app.listen(process.env.PORT || 3000, () => {
    console.log("Your server is running")
})