const express = require("express");

const router = express.Router();
const SLM = require("../../models/SAAT/SLM");


//SLM dashboard
router.get("/slm",async (req,res)=>{
    
    res.render("dashboard",{
        
        dept:"Soil Science and Land Management",
        head:"SLM_Department",
        path:"/slm_Student",
        record_path:"/slm_record",
        
        })
    })
//SLM record view
router.get("/slm_record",async (req,res)=>{
    const slm = await SLM.find().sort({session:"desc"});
    res.render("recordview",{
        head:"SLM_Record",
        del:"/slm_delete",
        dash:"/slm",
        record:slm,
        detail:"/slm_record_view",
        edit:"/slm_edit"
    });
})
//SLM view
router.get("/slm_record_view/:id",async(req,res)=>{
    const slm = await SLM.findById(req.params.id)
    res.render("View_record",{
        record:slm,
        head:"SLM_Record",
        dept:"Soil Science and Land Managment",
        dash:"/slm",
        recordl:"/slm_record"
    })
})
//create SLM student record
router.get("/slm_Student",(req,res)=>{
    res.render("recordform",{
        head:"SLM_record",
        dept:"Soil Science and Land Management",
        data:"/slm_Student",
        dash:"/slm"
    })
})
router.post("/slm_Student",async(req,res)=>{
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
   try{await new SLM(studata).save();
      console.log(studata)
   }catch(error){
       console.log(error)
   }
    res.redirect("/slm_record");

})

router.get("/slm_edit/:id", async (req,res)=>{
    const slm = await SLM.findById(req.params.id);
    res.render("editrecord",{
        edit:slm,
        head:"SLM_edit",
        dept:"Soil Science and Land Management",
        data:"/slm_edit",
        dash:"/slm_record",        
    })
})

router.put("/slm_edit/:id",async (req,res)=>{
    const slm = await SLM.findById(req.params.id);
    record = req.body;
    slm.session = record.session;
    slm.no_of_enrolled_stu = record.no_of_enrolled_stu;
    slm.no_of_admitted_stu = record.no_of_admitted_stu;
    slm.no_of_graduating_stu = record.no_of_graduating_stu;
    slm.no_of_firstClass_stu = record.no_of_firstClass_stu;
    slm.no_of_secondClass_stu = record.no_of_secondClass_stu;
    slm.no_of_thirdClass_stu = record.no_of_thirdClass_stu;

    try{
        await slm.save()
        console.log("record Updated");
        res.redirect("/slm_record");
    }
    catch(error){
        console.log(error)
    }

});



router.delete("/slm_delete/:id",async(req,res)=>{
   await SLM.findByIdAndDelete(req.params.id)
   console.log(" SLM Record Deleted");
   res.redirect("/slm_record");
});

module.exports = router;