const User=require("../models/user");
const jwt=require("jsonwebtoken");
const {setUser,getUser}=require("../service/auth");


async function authUser(req,res,next){

    const body=req.body;
    console.log(body);
    const {email,password}=body;
    const user = await User.findOne({ email, password });
    if(!user) 
    {
        console.log("user not found");
        return res.status(404).redirect("/login");
    }
    req.user=user;
    const token=setUser(user);
    res.cookie("uid", token);
    console.log("token has been created",token);
    console.log(res.cookie);
    next();
}




async function verifyUser(req, res, next) {
    try {
        console.log(req.cookies);
        // Check if cookies exist
        if (!req.cookies || !req.cookies.uid) {
            console.log("No UID cookie found");
            return res.status(401).redirect("/login"); // 401 for unauthorized
        }

        // Verify JWT
 

        // Extract token from Authorization header
        const token = req.cookies.uid;
        // const token=req.cookies.uid;
    
        

        const body = getUser(token); // Decoded payload from the token

        if (!body) {
            console.log("Invalid token");
            return res.status(401).redirect("/login"); // 401 for unauthorized
        }

        // Attach decoded user data to the request
        req.body = body;
        console.log("Token has been verified successfully",body);
        next();
    } catch (error) {
        console.error("Error during token verification:", error.message);
        return res.status(403).redirect("/login"); // 403 for forbidden
    }
}

async function verifyAdmin(req, res, next) {
    try {
        console.log(req.cookies);
        // Check if cookies exist
        if (!req.cookies || !req.cookies.uid) {
            console.log("No UID cookie found");
            return res.status(401).redirect("/login"); // 401 for unauthorized
        }

        // Verify JWT
 

        // Extract token from Authorization header
        const token = req.cookies.uid;
        // const token=req.cookies.uid;
    
        

        const body = getUser(token); // Decoded payload from the token

        if (!body || body.isadmin==false) {
            console.log("Invalid token");
            return res.status(401).redirect("/login"); // 401 for unauthorized
        }

        // Attach decoded user data to the request
        req.body = body;
        console.log("Token has been verified successfully",body);
        next();
    } catch (error) {
        console.error("Error during token verification:", error.message);
        return res.status(403).redirect("/login"); // 403 for forbidden
    }
}

module.exports={authUser,verifyUser,verifyAdmin};