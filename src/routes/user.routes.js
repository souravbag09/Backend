import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"


const router = Router()

router.route("/register").post(
    // add middleware
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coveImage",
            maxCount:1
        }

    ]),
    registerUser
)



export default router