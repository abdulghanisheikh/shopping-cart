const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart",
        default:null
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const orderModel=mongoose.model("order",orderSchema);
module.exports=orderModel;