const jwt=require("jsonwebtoken");
const User=require("../models/user");
const password="123456"
function setUser(user){

    if(!user){
        console.log("no user")
        return null;
    }
    const {name, email, password,age, adharnumber, isadmin}=user;
    const token=jwt.sign({name, email, password,age, adharnumber, isadmin},password);
    return token;
}

function getUser(token)
{
    console.log("from getUser Function and token is :",token);
    if(!token)
    {
        console.log("no token is present")
        return null;
    }

    const body=jwt.verify(token,password);
    return body;
}

module.exports={setUser,getUser};