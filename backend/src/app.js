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
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use("/user",authRoutes);
app.use("/food",foodRoutes);
app.use("/foodpartner",foodpartnerRoutes)

module.exports=app;