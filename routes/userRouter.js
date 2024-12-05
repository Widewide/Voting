const express=require("express");
const { verifyUser } = require("../middleware/auth");
const router=express.Router();


router.get("/",verifyUser,(req,res)=>{
    res.render("user");
})



module.exports=router;