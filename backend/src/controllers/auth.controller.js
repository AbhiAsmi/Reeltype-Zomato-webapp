const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "1d" });


const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ fullName, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
}); 

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullName,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
      token, 
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, { 
     httpOnly: true,
  secure: false,
  sameSite: "lax",
});

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullName,
        email: user.email,
      },
      token, 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};
const registerFoodPartner = async (req, res) => {
  try {
    const { name, email, password, contactName, phone, address } = req.body;

    const existing = await foodPartnerModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Food partner already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPartner = new foodPartnerModel({
      name,
      email,
      password: hashedPassword,
      contactName,
      phone,
      address,
    });

    await newPartner.save();

    const token = generateToken(newPartner._id);
    res.cookie("token", token, { 
  httpOnly: true,
  secure: false,
  sameSite: "lax",
 });

    res.status(201).json({
      message: "Food Partner registered successfully",
      partner: {
        id: newPartner._id,
        name: newPartner.name,
        email: newPartner.email,
      },
      token, 
    });
  } catch (error) {
    console.error("Register Food Partner error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const loginFoodPartner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const partner = await foodPartnerModel.findOne({ email });
    if (!partner || !(await bcrypt.compare(password, partner.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(partner._id);
    res.cookie("token", token, {
   httpOnly: true,
  secure: false,
  sameSite: "lax",

     });

    res.status(200).json({
      message: "Login successful",
      partner: {
        id: partner._id,
        name: partner.name,
        email: partner.email,
      },
      token, 
    });
  } catch (error) {
    console.error("Login Food Partner error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logoutFoodPartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Food Partner logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
