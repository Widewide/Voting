const express=require("express");
const router=express.Router();
const User=require("../models/user");
const {authUser,verifyUser}=require("../middleware/auth");
const Parties=require("../models/party")

router.get("/",verifyUser,async (req,res)=>{
    const parties=await Parties.find({});
    console.log(req.body);
    res.render("home",{parties:parties,body:req.body});
})


router.get("/login",(req,res)=>{
    res.render("login");
})

router.get("/signup",(req,res)=>{
    res.render("signup");
})

router.post("/signup",(req,res)=>{
const { name, email, password, age ,adharnumber, isadmin } = req.body;
try{
    User.create({name, email, password,age, adharnumber, isadmin})
}
catch(error){
    console.log(error.message);
    res.status(404);
}
console.log('user has been created');
res.redirect("/")
})

router.post("/login",authUser,(req,res)=>{
    console.log("this is from post :",req.user);
    // if(req.user.isadmin===true)
    // res.redirect("/admin");
    // else
    // res.redirect("/user")
    res.redirect("/");
})


router.post('/logout', (req, res) => {
    res.clearCookie('uid');
    res.status(200).json({ message: 'Logged out successfully' });
});

router.get("/vote",verifyUser,async (req,res)=>{
    const parties=await Parties.find({});

    res.render("vote",{parties:parties});
})

router.post("/vote",async(req,res)=>{
    const party=await Parties.findById(req.body.partyId);
    console.log("this is from post vote",party);
    if (!party) {
        return res.status(404).json({ message: "Party not found" });
    }
    party.numberofvote+=1;
    await party.save();
    // return res.status(200);
    // return res.status(200).json({ message: "Vote recorded successfully", votes: party.numberofvote });
})


module.exports=router;