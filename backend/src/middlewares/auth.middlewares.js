const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authFoodPartnerMiddlewares = async (req, res, next) => {
  try {
    let token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }


    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const foodPartner = await foodPartnerModel.findById(decoded.id);
    if (!foodPartner) {
      return res
        .status(401)
        .json({ message: "Not authorized as a food partner" });
    }
    req.foodPartner = foodPartner;
    next();
  } catch (err) {
    console.error("FoodPartner Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const authUserMiddleware = async (req, res, next) => {
  try {
    let token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "You must login first" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("User Auth Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = {
  authFoodPartnerMiddlewares,
  authUserMiddleware,
};