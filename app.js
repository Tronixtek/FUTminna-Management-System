const express = require("express");
const app = express()
const mongoose = require("mongoose");
const methodoverride = require("method-override");

const index = require("./Route/index");
const aetroute = require("./Route/SAAT/AET");
const animalProute = require("./Route/SAAT/AnimalP");
const  crpRoute = require("./Route/SAAT/CropP");
const fstRoute =require("./Route/SAAT/FST");
const  slmRoute = require("./Route/SAAT/SLM");
const  waftRoute = require("./Route/SAAT/WAFT");

const conn = require("./config/keys").MongoURI;
try{
mongoose.connect(conn,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}),
console.log("DataBase connected")
}catch(error){
    console.log(error)
}
app.set("view engine","ejs");


app.use(express.urlencoded({extended:false}));
app.use(methodoverride("_method"));
app.use(index);
app.use(aetroute);
app.use(animalProute);
app.use(crpRoute);
app.use(fstRoute);
app.use(slmRoute);
app.use(waftRoute);


PORT = process.env.PORT || 3000;
app.listen(PORT,console.log("server started"));