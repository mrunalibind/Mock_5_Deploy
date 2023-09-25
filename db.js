let mongoose=require("mongoose");
let connection=mongoose.connect("mongodb+srv://mrunali:mrunalibind@cluster0.tsxywrf.mongodb.net/Mock5?retryWrites=true&w=majority");

module.exports={connection};