const express=require("express");
const userModel=require("../models/userModel.js");
const userRouter=express.Router();
const {body,validationResult}=require("express-validator");
const bcrypt=require("bcrypt");

userRouter.post("/",[
    body("username").trim().notEmpty().withMessage("Username is required").isLength({min:3}).withMessage("Username must be atleast of 3 characters"),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({min:5}).withMessage("Password must be atleast of 5 characters")
],async function(req,res){
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                message:"Validation error",
                error:errors.array()
            });
        }
        const {username,password}=req.body;
        let user=await userModel.findOne({username});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }
        const salt=await bcrypt.genSalt(password,10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const createdUser=await userModel.create({
            username,
            password:hashedPassword,
            token:null,
            cartId:null
        });
        return res.status(200).json({
            success:true,
            message:"User created successfully",
            user:createdUser
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:err.message
        });
    }
});