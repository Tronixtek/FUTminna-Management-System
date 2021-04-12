const mongoose = require("mongoose");

const mceSchema =new mongoose.Schema({
    session:{
        type:Number
    },
    no_of_enrolled_stu:{
        type:Number
    },
    no_of_admitted_student:{
        type:Number
    },
    no_of_graduating_stu:{
        type:Number
    },
    no_of_firstClass_stu:{
        type:Number
    },
    no_of_secondClass_stu:{
        type:Number
    },
    no_of_thirdClass_stu:{
        type:Number
    },
})

module.exports = mongoose.model("mechatronics",mceSchema);