require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongodb = require("./db/db");
mongodb();

const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const foodpartnerRoutes = require("./routes/foodpartner.routes");


const allowedOrigins = [
  "http://localhost:5173",
  "https://reeltype-zomato-webapp-3pgw.vercel.app"
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", authRoutes);
app.use("/food", foodRoutes);
app.use("/foodpartner", foodpartnerRoutes);

module.exports = app;
