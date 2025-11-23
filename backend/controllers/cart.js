const cartModel=require("../models/cartModel.js");
const itemModel=require("../models/itemModel.js");
const userModel=require("../models/userModel.js");

async function addToCart(req,res){
    try{
        let user=await userModel.findById(req.user._id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid user"
            });
        }
        const {itemId}=req.body;
        let item=await itemModel.findById(itemId);
        if(!item){
            return res.status(400).json({
                success:false,
                message:"Item not found"
            });
        }
        if(!user.cartId){ //User dont have a cart
            let newCart=await cartModel.create({
                userId:user._id,
            });
            newCart.items.push(item._id);
            await newCart.save();
            user.cartId=newCart._id;
            await user.save();
        }
        else{ //User have a cart
            let cart=await cartModel.findById(user.cartId);
            cart.items.push(item._id);
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
}

async function listCart(req,res){
    try{
        let user=await userModel.findById(req.user._id);
        if(!user.cartId){
            return res.status(400).json({
                success:false,
                message:"Add items to the cart first."
            });
        }
        let cart=await cartModel.findById(user.cartId).populate("items"); //items is field in cart DB
        if(!cart){
            return res.status(400).json({
                success:false,
                message:"Add items to the cart first."
            });
        }
        return res.status(200).json({
            success:true,
            message:"Items fetched successfully",
            items:cart.items
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

module.exports={addToCart,listCart};