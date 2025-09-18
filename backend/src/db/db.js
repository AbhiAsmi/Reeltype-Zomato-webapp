require("dotenv").config();
const mongoose=require("mongoose");
const mongodb=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
         useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("mongodb is connected ");
    })
    .catch((err)=>{
   console.log(err.message);
    })
}
module.exports=mongodb;