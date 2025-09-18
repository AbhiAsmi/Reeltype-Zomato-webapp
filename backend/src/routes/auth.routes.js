const express=require("express");
const routes=express.Router();
const{registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner}=require("../controllers/auth.controller")
routes.post("/register",registerUser);
routes.post("/login",loginUser)
routes.get("/logout",logoutUser)
routes.post("/food-register", registerFoodPartner); 
routes.post("/food-login", loginFoodPartner);         
routes.post("/food-logout", logoutFoodPartner);
module.exports=routes;