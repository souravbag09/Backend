// import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"
// const app = express();

// // middle ware
// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true
// }))

// // middle ware
// app.use(express.json({limit:"16kb"}));
// app.use(express.urlencoded({extended:true,limit:"16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())


// // ROUTES IMPORT
// import userRouter from "./routes/user.routes.js"

// // routes declaration
// http://localhost:8000/api/v1/users/register
// app.use("/api/v1/users",userRouter)


// // export {app}

// // chat gpt
// export default app;



// chat gpt
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// ROUTES IMPORT
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);

export default app;
 