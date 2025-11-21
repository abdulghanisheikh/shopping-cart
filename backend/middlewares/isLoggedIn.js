const jwt=require("jsonwebtoken");
const userModel=require("../models/userModel.js");

async function isLoggedIn(req,res,next){
    try{
        let token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Auth denied"
            });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        let user=await userModel.findById(decoded.userId);
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid session"
            });
        }
        if(user.token!==token){ //New token != Old token -> Unauthorized
            return res.status(401).json({
                success:false,
                message:"Session expired or Logged-In from another device"
            });
        }
        const userObj=user.toObject();
        delete userObj.password;
        delete userObj.token;
        req.user=userObj;
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server Error",
            error:err.message
        });
    }
}

module.exports=isLoggedIn;