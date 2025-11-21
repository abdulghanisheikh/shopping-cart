const mongoose=require("mongoose");

const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    status:{
        type:String,
        default:"active"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
}); 

const itemModel=mongoose.model("item",itemSchema);
module.exports=itemModel;