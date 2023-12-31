let express=require("express");
const { UserModel } = require("../model/user_model");
let userRouter=express.Router();
let bcrypt=require("bcrypt");
let jwt=require("jsonwebtoken");

userRouter.post("/signup",async(req,res)=>{
    let {email,password}=req.body;
    try {
        let user=await UserModel.findOne({email});
        if(user){
            return res.status(400).send({msg:"User is already present with email"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            let user=new UserModel({email,password:hash});
            await user.save();
            res.status(200).send({msg:"Registeration Successfull"})
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
})

userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    try {
        let user=await UserModel.findOne({email});
        if(!user){
            return res.status(400).send({msg:"Invalid Credentials"})
        }
        bcrypt.compare(password,user.password,async(err,result)=>{
            
            if(result){
                let token=jwt.sign({userID:user._id},"mock5");
                res.status(200).send({msg:"Login Successfull",token})
            }
            else{
                return res.status(400).send({msg:"Invalid Credentials"})
            }
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports={userRouter};