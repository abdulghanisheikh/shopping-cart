const express=require("express");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const cartRouter=express.Router();
const {addToCart,listCart}=require("../controllers/cart.js");

cartRouter.post("/",isLoggedIn,addToCart);
cartRouter.get("/",isLoggedIn,listCart);

module.exports=cartRouter;