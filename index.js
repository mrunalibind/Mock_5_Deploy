let express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./route/user_route");
const { employeeRouter } = require("./route/employee_route");
let app=express();
let cors=require("cors");
app.use(cors())
app.use(express.json());

app.use("/user",userRouter);
app.use("/employee",employeeRouter);

app.get("/",(req,res)=>{
    res.send("Home Page");
})

app.listen(8090,async()=>{
    try {
        await connection;
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running on port 8090")
})