const express = require("express");
const app = express()
const mongoose = require("mongoose")

const index = require("./Route/index")

const conn = "mongodb+srv://futmx:fut_500@fut-db.hy7tu.mongodb.net/futmxDb?retryWrites=true&w=majority"
try{
mongoose.connect(conn,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}),
console.log("DataBase connected")
}catch(error){
    console.log(error)
}
app.set("view engine","ejs");

app.use(index)

PORT = process.env.PORT || 3000
app.listen(PORT,console.log("server started"))