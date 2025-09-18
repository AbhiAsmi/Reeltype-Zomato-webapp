
const foodModel = require("../models/food.model");
const likedModel = require("../models/like.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid")
async function createfood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video file is required" });
    }
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food created successfully",
      food: foodItem,
    });
  } catch (err) {
    console.error("Error creating food:", err.message); 
    res.status(500).json({
      message: "Error creating food",
      error: err.message,
    });
  }
}
async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find({});

    res.status(200).json({
      message: "Food items fetched successfully",
      foodItems,
    });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
async function likedVideos(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;
    const isAlreadyLiked = await likedModel.findOne({ user: user._id, food: foodId });
    if (isAlreadyLiked) {
      await likedModel.deleteOne({ user: user._id, food: foodId });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });

      return res.status(200).json({
        message: "Food unliked successfully",
        like: null,
      });
    }
    const like = await likedModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
    res.status(201).json({
      message: "Food liked successfully",
      like,
    });
  } catch (error) {
    console.error("Error liking food:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });
    if (isAlreadySaved) {
  
      await saveModel.deleteOne({ user: user._id, food: foodId });
      await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: -1 } });

      return res.status(200).json({
        message: "Food unsaved successfully",
      });
    }
    const save = await saveModel.create({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });

    res.status(201).json({
      message: "Food saved successfully",
      save,
    });
  } catch (error) {
    console.error("Error saving food:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
const Savedfood=async(req,res)=>{
try{
    const user=req.user;
 const savedfood = await saveModel.find({ user: user._id }).populate("food");
  res.status(201).json({
    message:"savedfood fetched successfully",
    savedfood 
  })
}
catch(error){
    console.error("Error fetching saved foods:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
}) 
}
}
module.exports = {
  createfood,
  getFoodItems,
  likedVideos,
  saveFood,
  Savedfood
};
