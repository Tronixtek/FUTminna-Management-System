const express = require("express");
const FST = require("../../models/SAAT/FST")
const router = express.Router();


//dashboard
router.get("/fst",(req,res)=>{
        res.render("dashboard",{
            head:"Fst_department",
            dept:"Food Science Technology",
            path:"fst_student",
            record_path:"fst_record"
        })
})


router.get("/fst_recordview/:id", async(req,res)=>{
    const fst = await FST.findById(req.params.id)
    res.render("view_record",{
        head:"FST Record",
        
        record:fst,
        dept:"Food Science Technology",
        recordl:"/fst_record",
        dash:"/fst"
    })

})
//fst records
router.get("/fst_record",async(req,res)=>{
    const fst = await FST.find().sort({session:"desc"});
    res.render("recordview",{
        head:"Food Science Technology Records",
        record:fst,
        del:"/fst_delete",
        detail: "/fst_recordview",
        dash:"/fst",
        edit:"/fst_edit"
        
    })
})

router.get("/fst_student",(req,res)=>{
    res.render("recordform",{
        head:"fst_record",
        dept:"Food Science Technology",
        data:"/fst_student",
        dash:"/fst"


    })
})
router.post("/fst_student", async (req,res)=>{
    record = req.body;
    const fst ={
        session:record.session,
        no_of_admitted_stu:record.no_of_admitted_stu,
        no_of_enrolled_stu:record.no_of_enrolled_stu,
        no_of_graduating_stu:record.no_of_graduating_stu,
        no_of_firstClass_stu:record.no_of_firstClass_stu,
        no_of_secondClass_stu:record.no_of_secondClass_stu,
        no_of_thirdClass_stu:record.no_of_thirdClass_stu
    }
    try{
        await FST(fst).save()
        res.redirect("/fst_record")
    }catch(error){
        console.log(error)
    }
})

router.get("/fst_edit/:id", async (req,res)=>{
    const fst = await FST.findById(req.params.id);
    res.render("editrecord",{
        edit:fst,
        head:"FST_edit",
        dept:"Food Science Technology",
        data:"/fst_edit",
        dash:"/fst_record",        
    })
})

router.put("/fst_edit/:id",async (req,res)=>{
    const fst = await FST.findById(req.params.id);
    record = req.body;
    fst.session = record.session;
    fst.no_of_enrolled_stu = record.no_of_enrolled_stu;
    fst.no_of_admitted_stu = record.no_of_admitted_stu;
    fst.no_of_graduating_stu = record.no_of_graduating_stu;
    fst.no_of_firstClass_stu = record.no_of_firstClass_stu;
    fst.no_of_secondClass_stu = record.no_of_secondClass_stu;
    fst.no_of_thirdClass_stu = record.no_of_thirdClass_stu;

    try{
        await fst.save()
        console.log("record Updated");
        res.redirect("/fst_record");
    }
    catch(error){
        console.log(error)
    }
});




router.delete("/fst_delete/:id", async (req,res)=>{
    await FST.findByIdAndDelete(req.params.id)
    console.log("FST record Deleted")
    res.redirect("/fst_record");

})




module.exports = router