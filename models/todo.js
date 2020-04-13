
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String, required: true,
  },
  status:{type:Number, required:false}
  
})

const todoModel = mongoose.model("todos", todoSchema) // creating the model from the schema

module.exports = todoModel // exporting the model