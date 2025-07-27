import { Router } from "express";
import { loginUser,logoutUser,registerUser,refreshAccessToken} from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(
    // add middleware
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }

    ]),
    registerUser
)

router.route("/login").post(loginUser)
 
// secure routes
router.route("/logout").post(verifyJWT,logoutUser)
// refresh token
router.route("/refresh-token").post(refreshAccessToken)

export default router