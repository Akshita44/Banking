const express=require("express");
const mongoose=require("mongoose")
const Schema = mongoose.Schema
const router= new express.Router();
router.use(express.json());
var Users = mongoose.model('User', new Schema({ Name: String, Email: String, Balance: Number}, { collection : 'users' }));   // collection name;
// User.find({}, function(err, data) { console.log(err, data, data.length);});
const Tschema=new mongoose.Schema({
    SenderEmail:{
        type:String,
        required:true,
    },
    RecieverEmail:{
        type:String,
        required:true,
    },
    Amount:{
        type:Number,
        required:true,
    }
},
{ timestamps : true}
)
const Transaction = new mongoose.model("Transaction",Tschema);
router.get("/users",async(req,res)=>{
    try{
    const data=await Users.find()
    console.log(data);
    res.status(200).send(data);
    }
    catch(err){
        res.status(400).send(err);
    }
})
router.put("/updateuser",async(req,res)=>{
    try{
    const d = await Users.findOne({Email:req.body.SenderEmail})
    const d2 = await Users.findOne({Email:req.body.RecieverEmail})
    if(d.Balance < Number(req.body.Amount))
    {
        res.status(400).send("Sender's Balance is less than the amount to be paid!!")
    }
    const b= Number(d.Balance - Number(req.body.Amount))
    const b2= Number(d2.Balance + Number(req.body.Amount))
    const data1=await Users.findByIdAndUpdate({_id:d._id},{$set:{Balance:b}},{new:true})
    const data2=await Users.findByIdAndUpdate({_id:d2._id},{$set:{Balance:b2}},{new:true})
    const t= new Transaction(req.body)
    const trans=await t.save();
    console.log(data1,data2,trans)
    res.status(201).send("Transaction done successfully")
    }
    catch(err){
        res.status(400).send("Some Error Occured");
    }
})
router.post("/transaction",async(req,res)=>{
    try{
        const data= new Transaction(req.body)
        const d=await data.save();
        res.status(200).send(d)
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})
router.get("/transaction",async(req,res)=>{
    try{
        const data= await Transaction.find()
        res.status(200).send(data)
    }
    catch(err)
    {
        res.status(400).send(err)

    }
})
module.exports=router