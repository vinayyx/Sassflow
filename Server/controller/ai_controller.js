
import OpenAI from "openai";
import "dotenv/config"
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express"
import axios from "axios"
import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import Pdf from "pdf-parse/lib/pdf-parse.js";


const AI = new OpenAI({
    apiKey: process.env.GEMINI_API,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});



export const genratearticle = async (req, res) => {
    try {

        const { userId } = req.auth();
        const { promt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({ success: false, message: "You have reached the limit upgrade to premium for using" })
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: promt,
                },
            ],
            temperature: 0.7,
            max_tokens: length,
        });

        const content = response.choices[0].message.content

        await sql` INSERT INTO creation (user_id , promt , content , type ) VALUES (${userId}, ${promt}, ${content}, 'Article') `

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({ success: true, content })

    } catch (error) {

        res.json({ success: true, message: error.message })

    }


}


export const blogtitle = async (req, res) => {
    try {

        const { userId } = req.auth();
        const { promt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (plan !== "premium" && free_usage >= 10) {
            return res.json({ success: false, message: "You have reached the limit upgrade to premium for using" })
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: promt,
                },
            ],
            temperature: 0.7,
            max_tokens: 80,
        });

        const content = response.choices[0].message.content

        await sql` INSERT INTO creation (user_id , promt , content , type ) VALUES (${userId}, ${promt}, ${content}, 'blog-title') `

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            })
        }

        res.json({ success: true, content })

    } catch (error) {

        res.json({ success: true, message: error.message })

    }


}

export const genrateimage = async (req, res) => {
    try {

        const { userId } = req.auth();
        const { promt, publish } = req.body;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.json({ success: false, message: "This feature is only available for premium plan" })
        }

        const formData = new FormData()
        formData.append('prompt', promt)

        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API_KEY,

            },

            responseType: "arraybuffer"


        }
        )

        const base64image = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`

        const { secure_url } = await cloudinary.uploader.upload(base64image)

        await sql` INSERT INTO creation (user_id , promt , content , type , publish ) VALUES (${userId}, ${promt}, ${secure_url}, 'Image-genrate' , ${publish ?? false} ) `


        res.json({ success: true, content: secure_url })

    } catch (error) {

        res.json({ success: true, message: error.message })

    }


}


export const removebackround = async (req, res) => {
    try {

        const { userId } = req.auth();
        const  image  = req.file;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.json({ success: false, message: "This feature is only available for premium plan" })
        }


        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: "background_removal",
                    background_removal: "remove_the_background"

                }
            ]
        })

        await sql` INSERT INTO creation (user_id , promt , content , type  ) VALUES (${userId}, 'Remove the background', ${secure_url}, 'Image' ) `


        res.json({ success: true, content: secure_url })

    } catch (error) {

        res.json({ success: true, message: error.message })

    }


}

export const removeobject = async (req, res) => {
    try {

        const { userId } = req.auth();
        const { object } = req.body;
        const image  = req.file;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.json({ success: false, message: "This feature is only available for premium plan" })
        }


        const { public_id } = await cloudinary.uploader.upload(image.path)

        const imgurl = cloudinary.url(public_id, {
            transformation: [{ effect: `gen_remove:${object}` }],
            resource_type: "image"
        })

        await sql` INSERT INTO creation (user_id , promt , content , type  ) VALUES (${userId}, ${`Removed ${object} from image`}, ${imgurl}, 'Image-genrate' ) `


        res.json({ success: true, content: imgurl })

    } catch (error) {

        res.json({ success: true, message: error.message })

    }


}


export const reviewresume = async (req, res) => {
    try {

        const { userId } = req.auth();
        const resume = req.file;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.json({ success: false, message: "This feature is only available for premium plan" })
        }

        if (resume.size > 5 * 1024 * 1024) {
            return res.json({ success: false, message: "we are not considered the pdf size upto 5mb" })
        }

        const dataBuffer = fs.readFileSync(resume.path)
        const pdfdata = await Pdf(dataBuffer)

        const promt = `Review this resume as a hiring expert and provide strengths, weaknesses, improvements, and role-specific suggestions. Resume content : \n\n ${pdfdata.text}`

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: promt,
                },
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const content = response.choices[0].message.content

    



        await sql` INSERT INTO creation (user_id , promt , content , type  ) VALUES (${userId}, ${promt}, ${content}, 'reviewresume' ) `


        res.json({ success: true, content: content })

    } catch (error) {

        res.json({ success: false, message: error })

    }


} 