const express = require("express");

const router = express.Router();
const AP = require("../../models/SAAT/AnimalP")


//animal production dashboard
router.get("/animalproduction",async (req,res)=>{
   
    res.render("dashboard",{
        dept:"Animal Production",
        head:"AP_Department",
        path:"/ap_Student",
        record_path:"/ap_record",
        delete:"/ap_delete/<%=record.id%>?_method=DELETE",
        update:"/ap_update/<%=record.id%>?_method=PUT"
})
})

router.get("/ap_recordview/:id", async(req,res)=>{
    const ap = await AP.findById(req.params.id)
    res.render("view_record",{
        head:"AnimalProduction Record",
        record:ap,
        dept:"Animal Production",
        recordl:"/ap_record",
        dash:"/animalproduction"
    })

})


//ap records
router.get("/ap_record",async(req,res)=>{
    const ap = await AP.find().sort({session:"desc"});
    res.render("recordview",{
        head:"Animal Productin Records",
        del:"/ap_delete",
        record:ap,
        detail: "/ap_recordview",
        dash:"/animalproduction",
        edit:"/ap_edit"
        
    })
})

//create AET student record
router.get("/ap_Student",(req,res)=>{
    res.render("recordform",{
        head:"AP_record",
        dept:"Animal Production",
        data:"/ap_Student",
        dash:"/animalproduction"
    })
})



router.post("/ap_Student",async(req,res)=>{
    
    let studata={
    session:req.body.session,
    no_of_enrolled_stu:req.body.no_of_enrolled_stu,
    no_of_admitted_stu:req.body.no_of_admitted_stu,
    no_of_graduating_stu:req.body.no_of_graduating_stu,
    no_of_firstClass_stu:req.body.no_of_firstClass_stu,
    no_of_secondClass_stu:req.body.no_of_secondClass_stu,
    no_of_thirdClass_stu:req.body.no_of_thirdClass_stu
}
   try{await new AP(studata).save();
      console.log(studata)
   }catch(error){
       console.log(error)
   }
    res.redirect("/ap_record");

});

//update record
router.get("/ap_edit/:id",async (req,res)=>{
    const ap = await AP.findById(req.params.id);
    res.render("editrecord",{
        head:"AP_edit",
        edit: ap,
        dept:"Animal Production",
        data:"/ap_edit",
        dash:"/ap_record"


    })
})

router.put("/ap_edit/:id",async (req,res)=>{
    const ap = await AP.findById(req.params.id);
    const record = req.body;
    ap.session = record.session;
    ap.no_of_enrolled_stu = record.no_of_enrolled_stu;
    ap.no_of_admitted_stu = record.no_of_admitted_stu;
    ap.no_of_graduating_stu = record.no_of_graduating_stu;
    ap.no_of_firstClass_stu = record.no_of_firstClass_stu;
    ap.no_of_secondClass_stu = record.no_of_secondClass_stu;
    ap.no_of_thirdClass_stu = record.no_of_thirdClass_stu;

    try{
        await ap.save();
        console.log("Record Editted Successfully");
        res.redirect("/ap_record");
    }catch(error){
        console.log(error);
    }
})

router.delete("/ap_delete/:id",async(req,res)=>{
   await AP.findByIdAndDelete(req.params.id);
   console.log("Animal Production Record Deleted");
    res.redirect("/ap_record");
});

module.exports = router;