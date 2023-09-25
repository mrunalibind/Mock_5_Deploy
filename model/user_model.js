let mongoose=require("mongoose");
let userSchema=mongoose.Schema({
    email:String,
    password:String
})

let UserModel=mongoose.model("user",userSchema);
module.exports={UserModel};