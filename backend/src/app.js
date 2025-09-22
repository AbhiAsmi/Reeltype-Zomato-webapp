require("dotenv").config();
const express=require("express");
const app=express();
const cookieParser=require("cookie-parser")
const mongodb=require("./db/db")
mongodb();
const authRoutes=require("./routes/auth.routes")
const foodRoutes=require("./routes/food.routes")
const foodpartnerRoutes=require("./routes/foodpartner.routes")
const cors=require("cors");
const allowedOrigins = [
  "http://localhost:5173", 
  "https://reeltype-zomato-webapp-1kv4.vercel.app" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use("/user",authRoutes);
app.use("/food",foodRoutes);
app.use("/foodpartner",foodpartnerRoutes)

module.exports=app;