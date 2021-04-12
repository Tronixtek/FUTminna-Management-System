const mongoose = require("mongoose");

const copmSchema = new mongoose.Schema({
    session:{
        type:Number
    },
    no_of_enrolled_student:{
        type:Number
    },
    no_of_admitted_student:{
        type:Number
    },
    no_of_grad_student:{
        type:Number
    },
    no_of_firstclass_stu:{
        type:Number
    },
    no_of_secondclass_stu:{
        type:Number
    },
    no_of_thirdclass_stu:{
        type:Number
    },
})

module.exports = mongoose.model("computer",compSchema);

const mongoose = require("mongoose");

