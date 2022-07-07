require("dotenv").config({path:"./.env"});
const express=require("express")
const app=express();
const port=process.env.PORT || 8000;
require("./conn")
app.use(require("./router/router"))
app.use(express.json());
if(process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));
}
app.listen(port,()=>{
    console.log("connection successful");
})