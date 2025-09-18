const express=require("express");
const routes=express.Router();
const {createfood,getFoodItems}=require("../controllers/food.controller")
const {authFoodPartnerMiddlewares,authUserMiddleware}=require("../middlewares/auth.middlewares")
const {likedVideos,saveFood,Savedfood}=require("../controllers/food.controller")
const multer=require("multer");
const upload=multer({
    storage:multer.memoryStorage()
})
routes.post("/create",authFoodPartnerMiddlewares,upload.single("video"),createfood);
routes.get("/fetch",getFoodItems)
routes.get("/foodpartner/:id",authUserMiddleware,getFoodItems)
routes.post("/like",authUserMiddleware,likedVideos); 
routes.post("/save",authUserMiddleware,saveFood)
routes.get("/savedfood/:id",authUserMiddleware,Savedfood)
module.exports=routes;
