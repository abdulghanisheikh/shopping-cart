const itemModel=require("../models/itemModel.js");
const {validationResult}=require("express-validator");

async function addItem(req,res){
    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                message:"Validation error",
                error:errors.array()
            });
        }
        const {name}=req.body;
        const exists=await itemModel.findOne({name});
        if(exists){
            return res.status(400).json({
                success:false,
                message:"Item already exists"
            });
        }
        let item=await itemModel.create({name});
        return res.status(200).json({
            success:true,
            message:"Item added successfully",
            item
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:err.message
        });
    }
};

async function getItems(req,res){
    try{
        let items=await itemModel.find();
        if(!items){
            return res.status(400).json({
                success:false,
                message:"No Items"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Items fetched successfully",
            items
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
module.exports={addItem,getItems};