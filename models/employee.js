
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String, required: true,
  },
  email:{type:String, required:true},
  salary:{type:Number, required:true},
  age:{type:Number, required:true},
  status:{type:Number, required:true, default:1},
  
})

const employeeModel = mongoose.model("employees", employeeSchema);

module.exports = employeeModel;