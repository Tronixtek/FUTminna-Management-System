const express = require("express");
const aetStaff = require("../../models/staff/staff")
const router = express.Router();
const AET = require("../../models/SAAT/AET")


//AET dashboard
router.get("/aet",async (req,res)=>{
    
    res.render("dashboard",{
        
        dept:"Agricultural Economics and Extention",
        head:"AET_Department",
        path:"/aet_Student",
        record_path:"/aet_record",
        
        })
    })
//AET record view
router.get("/aet_record",async (req,res)=>{
    const aet = await AET.find().sort({session:"desc"});
    res.render("recordview",{
        head:"AET_Record",
        del:"/aet_delete",
        record:aet,
        detail:"/aet_record",
        dash:"/aet",
        edit:"/aet_edit"
    });
})
//Aet view
router.get("/aet_record/:id",async(req,res)=>{
    const Aet = await AET.findById(req.params.id)
    try{
    res.render("View_record",{
        record:Aet,
        head:"AET_Record",
        dept:"Agricultural Economics and Extention",
        dash:"/aet",
        recordl:"/aet_record"
    })
    }catch(error){
        console.log(error);
    }
})
//create AET student record
router.get("/aet_Student",(req,res)=>{
    res.render("recordform",{
        head:"AET_record",
        dept:"Agricultural Economics and Extention",
        data:"/aet_Student",
        dash:"/aet"
    })
})
//post aet record
router.post("/aet_Student",async(req,res)=>{
    let record = req.body;
    let studata={
    session:record.session,
    no_of_enrolled_stu:record.no_of_enrolled_stu,
    no_of_admitted_stu:record.no_of_admitted_stu,
    no_of_graduating_stu:record.no_of_graduating_stu,
    no_of_firstClass_stu:record.no_of_firstClass_stu,
    no_of_secondClass_stu:record.no_of_secondClass_stu,
    no_of_thirdClass_stu:record.no_of_thirdClass_stu
}
   try{await new AET(studata).save();
      console.log(studata)
   }catch(error){
       console.log(error)
   }
    res.redirect("/aet_record");

})

//update aet record
router.get("/aet_edit/:id",async (req,res)=>{
    const aet = await AET.findById(req.params.id);
    res.render("editrecord",{
        edit:aet,
        head:"AET_edit",
        dept:"Agricultural Economics and Extension",
        data:"/aet_edit",
        dash:"/aet_record"

    })
})

router.put("/aet_edit/:id", async(req,res)=>{
    let aet = await AET.findById(req.params.id);
    let record = req.body;
    
    aet.session=record.session,
    aet.no_of_enrolled_stu=record.no_of_enrolled_stu,
    aet.no_of_admitted_stu=record.no_of_admitted_stu,
    aet.no_of_graduating_stu=record.no_of_graduating_stu,
    aet.no_of_firstClass_stu=record.no_of_firstClass_stu,
    aet.no_of_secondClass_stu=record.no_of_secondClass_stu,
    aet.no_of_thirdClass_stu=record.no_of_thirdClass_stu

   try{await  aet.save();
      console.log(" record Edited Successfully")
   }catch(error){
       console.log(error)
   }
    res.redirect("/aet_record");



})

//delete aet record
router.delete("/aet_delete/:id",async(req,res)=>{
   await AET.findByIdAndDelete(req.params.id)
   console.log("AET Record Deleted");
    res.redirect("/aet_record");
});

module.exports = router;