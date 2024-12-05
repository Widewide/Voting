const express=require("express");
const router=express.Router();
const Parties=require("../models/party");


const { verifyAdmin } = require("../middleware/auth");


router.get("/", verifyAdmin, async (req, res) => {
    try {
        const parties = await Parties.find({});
        res.render("admin", { parties:parties });
    } catch (error) {
        console.error("Error fetching parties:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    console.log("this has been hit")
    const { name, leadername, vote } = req.body;
    console.log(req.body);
    try {
        const newParty = await Parties.create({ name, leadername, vote });
        res.status(201).json({ message: "Party has been added", party: newParty });
    } catch (err) {
        console.error("Error creating party:", err.message);
        res.status(500).json({ error: "Failed to add party" });
    }
});

module.exports=router;