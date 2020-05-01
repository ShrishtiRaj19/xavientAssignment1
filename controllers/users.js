'use strict;'

const userModel = require("../models/users")
const jwt = require('jsonwebtoken')
var ACCESS_TOKEN_SECRET='cd720ce3844bb9b8a628e8473c324fefa1f83567f30104cb511645df97d09eb79be8586b0a2ea9512a02ed04f886dde562b3ff8dcf2fc60e0610c9fe505f3dc0'

const signup = async(req, res, next) =>{
    
    
	const user = { name: req.body.name, password: req.body.password }
	//const users1=JSON.parse(fs.readFileSync('userlist.json', 'utf-8'));
	
	if(user.name==="" || user.password==="")
	   return res.send('Cannot add empty field')
	const userindb= await userModel.findOne({name:req.body.name},{"name":1,"_id":0})
	if(userindb!= null  && userindb.name  ===req.body.name)
		return res.send('Username is already taken, try different username')
	
		//if(user.name===)  
	/*users1.push(user);
	fs.writeFileSync("userlist.json", JSON.stringify(users1)); */
	const todoObj= await userModel.create(user)
	console.log(todoObj);
	res.status(201).send("User added successfuly")
 
}

const login = async(req, res, next) =>{
    
    
const logged_user = await userModel.findOne({name:req.body.name},{"name":1,"_id":0})

	if (logged_user == null) 
  return res.send('Cannot find user')

const passwordexists = await userModel.findOne({password:req.body.password},{"password":1,"_id":0})   
  if(passwordexists==null) 
	 return res.send('Not Allowed')
	 
  //Authorize user
const user={name:req.body.name};
const accessToken=jwt.sign(user, ACCESS_TOKEN_SECRET) 
res.json({accessToken:accessToken}) 
 
}

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]
	if (token == null) return res.sendStatus(401)
  
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
	  console.log(err)
	  if (err) return res.sendStatus(403)
	  req.user = user
	  next()
	})
  }
module.exports = {
	signup, 
	login
}
