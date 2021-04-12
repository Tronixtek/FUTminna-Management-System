const express = require("express");


const router = express.Router();
const CRP = require("../../models/SAAT/CropP")


//crop production dashboard
router.get("/crp",async (req,res)=>{
    
    res.render("dashboard",{
        
        dept:"Crop Production",
        head:"Crop_Production_Department",
        path:"/crp_Student",
        record_path:"/crp_record",
        
        })
    })
//crop production record view
router.get("/crp_record",async (req,res)=>{
    const crp = await CRP.find().sort({session:"desc"});
    res.render("recordview",{
        head:"Crop_Production_Record",
        del:"/crp_delete",
        record:crp,
        detail:"/crp_record_view",
        dash:"/crp",
        edit:"/crp_edit"
        
    });
})
//crp view
router.get("/crp_record_view/:id",async(req,res)=>{
    const crp = await CRP.findById(req.params.id)
    res.render("View_record",{
        record:crp,
        head:"CRP_Record",
        dept:"Crop Production",
        recordl:"/crp_record",
        dash:"/crp",
        
    })
})
//create crp student record
router.get("/crp_Student",(req,res)=>{
    res.render("recordform",{
        head:"CRP_record",
        dept:"Crop Production",
        data:"/crp_Student",
        dash:"/crp"
    })
})



router.post("/crp_Student",async(req,res)=>{
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
   try{await new CRP(studata).save();
      console.log(studata)
   }catch(error){
       console.log(error)
   }
    res.redirect("/crp_record");

});

router.get("/crp_edit/:id", async (req,res)=>{
    const crp = await CRP.findById(req.params.id);
    res.render("editrecord",{
        edit:crp,
        head:"CRP_edit",
        dept:"Crop Production",
        data:"/crp_edit",
        dash:"/crp_record",        
    })
})

router.put("/crp_edit/:id",async (req,res)=>{
    const crp = await CRP.findById(req.params.id);
    record = req.body;
    crp.session = record.session;
    crp.no_of_enrolled_stu = record.no_of_enrolled_stu;
    crp.no_of_admitted_stu = record.no_of_admitted_stu;
    crp.no_of_graduating_stu = record.no_of_graduating_stu;
    crp.no_of_firstClass_stu = record.no_of_firstClass_stu;
    crp.no_of_secondClass_stu = record.no_of_secondClass_stu;
    crp.no_of_thirdClass_stu = record.no_of_thirdClass_stu;

    try{
        await crp.save()
        console.log("record Updated");
        res.redirect("/crp_record");
    }
    catch(error){
        console.log(error)
    }

});

router.delete("/crp_delete/:id",async(req,res)=>{
   await CRP.findByIdAndDelete(req.params.id)
   console.log(" Crop Production Record Deleted");
    res.redirect("/crp_record");
});

module.exports = router;