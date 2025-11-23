const express=require("express");
const app=express();
require("dotenv").config();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const connectDB=require("./configs/db.config.js");
const userRouter=require("./routes/userRoutes.js");
const itemRouter=require("./routes/itemRoutes.js");
const cartRouter=require("./routes/cartRoutes.js");
const orderRouter=require("./routes/orderRoutes.js");

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["POST","GET","DELETE","PATCH"],
    credentials:true
}));
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use("/users",userRouter);
app.use("/items",itemRouter);
app.use("/carts",cartRouter);
app.use("/orders",orderRouter);

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});