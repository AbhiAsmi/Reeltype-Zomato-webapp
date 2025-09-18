const express=require("express");
const {getfoodpartnerbyId}=require("../controllers/foodpartner.controller")
const {authusermiddleware } = require("../middlewares/auth.middlewares");
const routes=express.Router();

routes.get("/profile/:id",getfoodpartnerbyId)
module.exports=routes