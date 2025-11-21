const mongoose=require("mongoose");

async function connectDB(){
    mongoose.connect(process.env.MONGODB_URI).then(function(){
        console.log("DB connected");
    }).catch(function(err){
        console.log(err.message);
    });
}
module.exports=connectDB;