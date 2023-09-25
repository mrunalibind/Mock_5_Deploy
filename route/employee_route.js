let express=require("express");
const { EmployeeModel } = require("../model/employee_model");
let employeeRouter=express.Router();

employeeRouter.get("/get",async(req,res)=>{
    try {
        let employee=await EmployeeModel.find();
        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

employeeRouter.post("/add",async(req,res)=>{
    let {firstName,lastName,email,department,salary}=req.body;
    try {
        let employee=new EmployeeModel({firstName,lastName,email,department,salary});
        await employee.save();
        res.status(200).send({msg:"Employee is created"});

    } catch (error) {
        res.status(400).send(error.message);
    }
})

employeeRouter.get("/department",async(req,res)=>{
    let {dept}=req.query;
    try {
        let employee=await EmployeeModel.find({department:dept})
        res.status(200).send(employee);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

employeeRouter.get("/sort",async(req,res)=>{
    let {order}=req.query;
    console.log(typeof order);
    try {
        let employee=await EmployeeModel.aggregate([{$sort:{salary:parseInt(order)}}])
        res.status(200).send(employee);

    } catch (error) {
        res.status(400).send(error.message);
    }
})

employeeRouter.get("/pagination",async(req,res)=>{
    let {page}=req.query;
    try {
        let start=(parseInt(page)-1)*5;
        let employee=await EmployeeModel.aggregate([{$skip:start},{$limit:5}])
        res.status(200).send(employee);

    } catch (error) {
        res.status(400).send(error.message);
    }
})

employeeRouter.patch("/update/:Id",async(req,res)=>{
    let {Id}=req.params;
    try {
        let employee=await EmployeeModel.findByIdAndUpdate({_id:Id},req.body)
        res.status(200).send({msg:"Employee Data is updated"});

    } catch (error) {
        res.status(400).send(error.message);
    }
})

employeeRouter.delete("/remove/:Id",async(req,res)=>{
    let {Id}=req.params;
    try {
        await EmployeeModel.findByIdAndDelete({_id:Id})
        res.status(200).send({msg:"Employee Data is deleted"});
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports={employeeRouter}
