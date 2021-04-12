const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  
    session:{
        type:String, 
    },
    no_of_Academic_staff:{
        type:Number,
    },
    no_of_non_academic_staff:{
        type:Number
    },
    no_of_labTechnician:{
        type:Number
    },
    
});

module.exports = mongoose.model("STAFF",staffSchema);
