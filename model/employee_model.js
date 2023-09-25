let mongoose=require("mongoose");
let employeeSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    department:String,
    salary:Number
})

let EmployeeModel=mongoose.model("employee",employeeSchema);
module.exports={EmployeeModel};