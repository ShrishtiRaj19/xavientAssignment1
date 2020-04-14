'use strict;'

const employeeModel = require("../models/employee.js")

const getEmployee = async(req, res, next) =>{
	try{
		const list = await employeeModel.find({});
		return res.status(200).json(list)
	}catch(err){
    return res.status(400).json({status:"Failure", msg:"Error while getting detail of Employee"})
	}
 
}

const searchEmployee = async(req, res, next)=>{
  try{
    let cond = {};
    if(req.body.searchText){
      cond = {$or:[{name:{$regex:req.body.searchText, $options:"i"}}, {email:{$regex:req.body.searchText, $options:"i"}}]}
    }
    const list = await employeeModel.find(cond);
    if(list && list.length){
      return res.status(200).json(list)
    }else{
      return res.status(200).json({status:"Success", msg:"No record found!"})
    }

  }catch(err){
    console.log("err", err)
    return res.status(400).json({status:"Failure", msg:"Error while getting list of Employee"})
  }
}

const createEmployee = async (req, res, next) => {
  try {
    const newEmployee = await employeeModel.create(req.body)
    return res.status(200).json(newEmployee)
  } catch (err) {
    console.log("err", err)
    return res.status(400).json({status:"Failure", msg:"Error while adding employee"})  
  }
}

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeModel.findOne({_id:req.params.id})
    return res.status(200).json(employee)
  } catch (err) {
    console.log("err", err)
    return res.status(400).json({status:"Failure", msg:"Error while getting employee details"})  
  }
}
  

const updateEmployee = async (req, res, next) => {
  try {
    if(Object.keys(req.body).length && req.bosy.status){
  	  await employeeModel.findOneAndUpdate({_id:req.params.id},{$set:{status:req.body.status}})
   	  return res.status(200).json({status:"Success", msg:"Status is successfully updated"})

    }else{
      const updatedData = await employeeModel.findOneAndUpdate({_id:req.params.id}, req.body, {
        new: true,
      })
      return res.status(200).json(updatedData)
    }
  } catch (err) {
    return res.status(400).json({status:"Failure", msg:"Error while updating Task"});
  }
}


const deleteEmployee = async(req, res, next)=>{
  try{
   await employeeModel.findByIdAndRemove({_id:req.params.id})
    return res.status(200).json({status:"Success", msg:"Employee is Successfully Deleted"})
  }catch(err){
    return res.status(400).json({status:"Failure", msg:"Error while deleting Employee"});
  }
}

module.exports = {
	getEmployee, 
	createEmployee,
  updateEmployee,
  searchEmployee,
  getEmployeeById,
  deleteEmployee

}