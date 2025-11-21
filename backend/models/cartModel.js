const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:null
    },
    name:{
        type:String,
        default:"My Cart"
    },
    status:{
        type:String,
        default:"open"
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"item"
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
});

const cartModel=mongoose.model("cart",cartSchema);
module.exports=cartModel;