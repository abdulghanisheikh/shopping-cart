const express=require("express");
const cartModel=require("../models/cartModel.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const cartRouter=express.Router();

cartRouter.post("/",isLoggedIn,async function(req,res){
    try{
        let user=await userModel.findById(req.user._id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid user"
            });
        }
        const {itemId}=req.body;
        if(!itemId){
            return res.status(400).json({
                success:false,
                message:"Item not found"
            });
        }
        if(!user.cartId){ //User dont have a cart
            let newCart=await cartModel.create({
                userId:user._id,
            });
            newCart.items.push(itemId);
            await newCart.save();
            user.cartId=newCart._id;
            await user.save();
        }
        else{ //User have a cart
            let cart=await cartModel.findById(user.cartId);
            cart.items.push(itemId);
            await cart.save();
        }
        return res.status(200).json({
            success:true,
            message:"Item added to cart"
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

module.exports=cartRouter;