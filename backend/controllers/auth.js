const userModel=require("../models/userModel.js");
const bcrypt=require("bcrypt");
const {validationResult}=require("express-validator");
const jwt=require("jsonwebtoken");

async function createUser(req,res){
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
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const createdUser=await userModel.create({
            username,
            password:hashedPassword,
            token:null,
            cartId:null
        });
        const userObj=createdUser.toObject();
        delete userObj.password;
        return res.status(200).json({
            success:true,
            message:"User created successfully",
            user:userObj
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:err.message
        });
    }
}

async function loginUser(req,res){
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
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid username or password"
            });
        }
        const correct=await bcrypt.compare(password,user.password);
        if(!correct){
            return res.status(400).json({
                success:false,
                message:"Invalid username or password"
            });
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        user.token=token;
        await user.save();
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax" 
        });
        const userObj=user.toObject();
        delete userObj.password;
        res.status(200).json({
            success:true,
            message:"Login Successfull",
            user:userObj
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:err.message
        });
    }
}

async function logoutUser(req,res){
    try{
        let user=await userModel.findById(req.user._id);
        if(!user){
            return res.status(401).json({ //401->Unauthorized
                success:false,
                message:"Logout Failed"
            });
        }
        user.token=null;
        await user.save();
        res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        });
        return res.status(200).json({
            success:true,
            message:"Logout Successful"
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:err.message
        });
    }
}

module.exports={createUser,loginUser,logoutUser};