const express = require("express");
const WAFT = require("../../models/SAAT/WAFT");

const router = express.Router();



//WAFT dashboard
router.get("/waft",async (req,res)=>{
    
    res.render("dashboard",{
        
        dept:"Water Resources,Aquaculture and Fishry Technology",
        head:"WAFT_Department",
        path:"/waft_Student",
        record_path:"/waft_record",
        
        })
    })
//WAFT record view
router.get("/waft_record",async (req,res)=>{
    const waft = await WAFT.find().sort({session:"desc"});
    res.render("recordview",{
        head:"WAFT_Record",
        record:waft,
        del:"/waft_delete",
        detail:"/waft_record_view",
        dash:"/waft",
        edit:"/waft_edit"
    });
})
//WAFT view
router.get("/waft_record_view/:id",async(req,res)=>{
    const waft = await WAFT.findById(req.params.id)
    res.render("View_record",{
        record:waft,
        head:"WAFT_Record",
        dept:"Water Resources,Aquaculture and Fishry Technology",
        recordl:"/waft_record",
        dash:"/waft"
    })
})
//create WAFT student record
router.get("/waft_Student",(req,res)=>{
    res.render("recordform",{
        head:"WAFT_record",
        dept:"Water Resources,Aquaculture,and Fishery Technology",
        data:"/waft_Student",
        dash:"/waft" 
    })
})


router.post("/waft_Student",async(req,res)=>{
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
   try{await new WAFT(studata).save();
      console.log(studata)
   }catch(error){
       console.log(error)
   }
    res.redirect("/waft_record");

})

router.get("/waft_edit/:id", async (req,res)=>{
    const waft = await WAFT.findById(req.params.id);
    res.render("editrecord",{
        edit:waft,
        head:"WAFT_edit",
        dept:"Water Resources, Aquaculture and Fishry",
        data:"/waft_edit",
        dash:"/waft_record",        
    })
})

router.put("/waft_edit/:id",async (req,res)=>{
    const waft = await WAFT.findById(req.params.id);
    record = req.body;
    waft.session = record.session;
    waft.no_of_enrolled_stu = record.no_of_enrolled_stu;
    waft.no_of_admitted_stu = record.no_of_admitted_stu;
    waft.no_of_graduating_stu = record.no_of_graduating_stu;
    waft.no_of_firstClass_stu = record.no_of_firstClass_stu;
    waft.no_of_secondClass_stu = record.no_of_secondClass_stu;
    waft.no_of_thirdClass_stu = record.no_of_thirdClass_stu;

    try{
        await waft.save()
        console.log("record Updated");
        res.redirect("/waft_record");
    }
    catch(error){
        console.log(error)
    }

});




router.delete("/waft_delete/:id",async(req,res)=>{
   await WAFT.findByIdAndDelete(req.params.id)
   console.log(" WAFT Record Deleted");
    res.redirect("/waft");
});

module.exports = router;