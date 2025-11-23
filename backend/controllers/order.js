const orderModel=require("../models/orderModel.js");
const cartModel=require("../models/cartModel.js");

async function placeOrder(req,res){
    try{
        if(!req.user.cartId){
            return res.status(400).json({
                success:false,
                message:"Cart does not exists"
            });
        }
        let cart=await cartModel.findById(req.user.cartId);
        if(!cart){
            return res.status(400).json({
                success:false,
                message:"Cart not found"
            });
        }
        if(cart.items.length===0){
            return res.status(400).json({
                success:false,
                message:"Cart is empty"
            });
        }
        let cartId=req.user.cartId;
        let userId=req.user._id;
        let order=await orderModel.create({
            cartId,
            userId 
        });
        cart.items=[];
        await cart.save();
        return res.status(200).json({
            success:true,
            message:"Order placed successfully",
            order
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

async function listOrders(req,res){
    try{
        let orders=await orderModel.find();
        if(!orders){
            return res.status(400).json({
                success:false,
                message:"Orders does not exist"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            orders
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

module.exports={placeOrder,listOrders};