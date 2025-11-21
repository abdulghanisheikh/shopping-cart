const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:null
    },
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart",
        default:null
    },
    createAt:{
        type:Date,
        default:Date.now()
    }
});

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;