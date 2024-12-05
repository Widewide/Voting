const mongoose = require("mongoose");

// Define the user schema
const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Fixed 'require' to 'required'
        unique: true,
    },
    leadername:{
        type:String,
        require:true,
        unique:true,
    },
    numberofvote: {
        type: Number,
        default: 0, // Set default value for numberofvote to 0
    },
});

// Create the User model
const Parties = mongoose.model("party", partySchema); // Added model name as "User"

// Export the User model
module.exports = Parties;
