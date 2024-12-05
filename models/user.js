const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Fixed 'require' to 'required'
        unique: true,
    },
    age: {
        type: Number, // Changed 'Int16Array' to 'Number'
        required: true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        require:true
    },

    adharnumber: {
        type: Number,
        required: true,
        unique: true,
    },
    isadmin:{
        type:Boolean,
        require:true,
    },
    isvoted:{
        type:Boolean,
        default:false,
    }
});

// Create the User model
const User = mongoose.model("user", userSchema); // Added model name as "User"

// Export the User model
module.exports = User;
