const express=require("express");
const {body,validationResult}=require("express-validator");
const userRouter=express.Router();
const {createUser,loginUser,logoutUser}=require("../controllers/auth.js");
const getUsers=require("../controllers/user.js");
const isLoggedIn=require("../middlewares/isLoggedIn.js");

userRouter.post("/",[
    body("username").trim().notEmpty().withMessage("Username is required").isLength({min:3}).withMessage("Username must be atleast of 3 characters"),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({min:5}).withMessage("Password must be atleast of 5 characters")
],createUser);
userRouter.post("/login",[
    body("username").trim().notEmpty().withMessage("Username is required"),
    body("password").trim().notEmpty().withMessage("Password is required")
],loginUser);
userRouter.post("/logout",isLoggedIn,logoutUser);
userRouter.get("/",isLoggedIn,getUsers);

module.exports=userRouter;