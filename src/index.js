

import dotenv from "dotenv"
dotenv.config({ path: './env' });
import connectDB from "./db/db.js";
// chatgpt
import app from './app.js';

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000,()=> {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=> {
    console.log("MONGO db connection error !!!", err);
    
})






















// data base connection

/*
( async()=> {
     try{
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        app.on("error",(error)=> {
            console.log("Error",error);
            throw error
        })

        app.listen(process.env.PORT,()=> {
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })
     }catch(error) {
        console.error("ERROR: ",error)
        throw err
     }
}) ()
     */