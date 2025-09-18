const foodPartnerModel=require("../models/foodpartner.model")
const foodModel=require("../models/food.model")

const getfoodpartnerbyId=async(req,res)=>{
    const foodpartnerId=req.params.id

    const foodpartner=await foodPartnerModel.findById(foodpartnerId);
    const foodItemsbyPartner=await foodModel.find({foodPartner:foodpartnerId})
    if(!foodpartner){
        return res.status(404).json({
            message:"food partner not found"
    })
}
   return res.status(200).json({
        message:"food partner fetched successfully",
        foodpartner:{
            ...foodpartner.toObject(),
            foodItems:foodItemsbyPartner

        }   })

}
module.exports={
    getfoodpartnerbyId
}
