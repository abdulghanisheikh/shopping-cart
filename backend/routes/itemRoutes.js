const express=require("express");
const itemRouter=express.Router();
const isLoggedIn=require("../middlewares/isLoggedIn.js");
const {body}=require("express-validator");
const {addItem,getItems}=require("../controllers/item.js");

itemRouter.post("/",[
    body("name").trim().notEmpty().withMessage("Item's name is required").isLength({min:2}).withMessage("Name is atleast 2 character long")
],isLoggedIn,addItem);

itemRouter.get("/",isLoggedIn,getItems);

module.exports=itemRouter;