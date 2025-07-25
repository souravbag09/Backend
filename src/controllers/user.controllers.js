
import {asyncHandler} from '../utils/async.handler.js';
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse }  from '../utils/ApiResponse.js';


const registerUser = asyncHandler(async (req , res)=> {
     // get user details from fontend 
     const {fullName,email,username,password} = req.body
     console.log("email: ",email);
     
     // validation - not empty
    //  if(fullName === "") {
    //     throw new ApiError(400, "Full name is required");
    //  } // OR
    if (
        [fullName,email,username,password].some((field) => 
            field?.trim() === "") 
    ) {
        throw new ApiError(400,"All field are required")
    }
     // check if user already exists:username,email
     const existedUser=User.findOne({
        $or: [{username},{email}]
     })
     if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
     }
     // check for images , check for avatar
     const avatarLocalPath = req.files?.avatar[0]?.path;
     const coverImageLocalPath = req.files?.coverImage[0]?.path;
     if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
     }
     // upload them to cloudinary,avatar
     const avatar = await uploauploadOnCloudinary(avatarLocalPath)
     const coverImage = await uploauploadOnCloudinary(coverImageLocalPath);

     if(!avatar) {
        throw new ApiError(400, "Avatar upload failed");
     }
     // create user object - create entry in db
     const user = User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
     })
     // remove password and refresh token feild from response
     const createdUser = await User.findById(user._id).select(
        // kya kya nhi chiye
        "-password -refreshToken"
     )
     // check for user creation
     if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
     }
     
     //return res
     return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered successfully")
     )


})

export {registerUser};    