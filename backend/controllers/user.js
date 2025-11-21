const userModel=require("../models/userModel.js");

async function getUsers(req,res){
    try{
        let users=await userModel.find().select("-password -token");
        return res.status(200).json({
            success:true,
            message:"Users fetch successful",
            users
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
module.exports=getUsers;