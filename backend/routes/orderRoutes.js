const express=require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const orderRouter=express.Router();
const {placeOrder,listOrders}=require("../controllers/order.js");

orderRouter.post("/",isLoggedIn,placeOrder);
orderRouter.get("/",isLoggedIn,listOrders);

module.exports=orderRouter;