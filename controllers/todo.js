'use strict;'

const todo = require("../models/todo.js")

const getTask = async(req, res, next) =>{
	try{
		const list = await todo.find({});
		return res.status(200).json(list)
	}catch(err){
    return res.status(400).json({status:"Failure", msg:"Error while getting details of Task"})
	}
 
}

const createTask = async (req, res, next) => {
  try {
    const todoObj= await todo.create(req.body)
    return res.status(200).json(todoObj)
  } catch (err) {
    return res.status(400).json({status:"Failure", msg:"Error while adding task"})  
  }
}
  

const updateTask = async (req, res, next) => {
  try {
    const updatedData = await todo.findOneAndUpdate({_id:req.params.id}, req.body, {
      new: true,
    })
    return res.status(200).json(updatedData)
  } catch (err) {
    return res.status(400).json({status:"Failure", msg:"Error while updating Task"});
  }
}


const updateStatus = async (req, res, next) => {
  try {
    	await todo.findOneAndUpdate({_id:req.params.id},{$set:{status:req.body.status}})
   		return res.status(200).json({status:"Success", msg:"task is successfully completed"})
  	
  } catch (err) {
    return res.status(400).json({status:"Failure", msg:"Error while adding Task"});
  }
}

const deleteTask = async(req, res, next)=>{
  try{
    await todo.findByIdAndRemove({_id:req.params.id})
    return res.status(200).json({status:"Success", msg:"Task is Successfully Deleted"})
  }catch(err){
    return res.status(400).json({status:"Failure", msg:"Error while deleting Task"});
  }
}

module.exports = {
	getTask, 
	createTask,
  updateTask,
  updateStatus,
  deleteTask
}