
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  password:{type:String, required:false}
  
})

const userModel = mongoose.model("users", userSchema) // creating the model from the schema

module.exports = userModel // exporting the model