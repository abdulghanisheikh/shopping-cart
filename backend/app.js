const express=require("express");
const app=express();
require("dotenv").config();
const connectDB=require("./configs/db.config.js");
const userRouter=require("./routes/userRoutes.js");

connectDB();
const port=process.env.PORT||3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});