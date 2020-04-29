'use strict;'
const express = require("express");
const app =  express();
const bodyparser = require('body-parser');
const db = require("./models/index.js")
var todoRoutes = require('./routes/todo')
var employeeRoutes = require('./routes/employee')
const router = express.Router();
var cors = require("cors")

//raghav start
var ACCESS_TOKEN_SECRET='cd720ce3844bb9b8a628e8473c324fefa1f83567f30104cb511645df97d09eb79be8586b0a2ea9512a02ed04f886dde562b3ff8dcf2fc60e0610c9fe505f3dc0'
const jwt = require('jsonwebtoken')
require('dotenv').config()
const fs = require('fs');
//raghav end
app.use(bodyparser.json())
app.use('/api',router);
todoRoutes(router);
employeeRoutes(router);
app.use(cors({origin: '*'}))

app.use(express.static(__dirname + '/userlist.json'));
console.log("express.static(__dirname + './userlist.json')", __dirname + '/userlist.json')
const appPort = process.env.PORT ? process.env.PORT :4000 
app.listen(appPort, ()=>{
	console.log("listening to port", appPort, " !!");
})

//raghav start

app.post("/api/users", (req, res) => {
    
	const user = { name: req.body.name, password: req.body.password }
	const users1=JSON.parse(fs.readFileSync('userlist.json', 'utf-8'));
	users1.push(user);
	console.log("user1===", user1)
	fs.writeFileSync("userlist.json", JSON.stringify(users1)); 
	res.status(201).send()
  })

app.post("/api/login", (req, res, next) => {
	  
const users=JSON.parse(fs.readFileSync('userlist.json', 'utf-8'));
  // Authenticate user
const logged_user = users.find(user => user.name === req.body.name)
if (logged_user == null) {
  return res.status(400).send('Cannot find user')
}
const passwordexists = users.find(user => user.password === req.body.password)     
  if(passwordexists==null) {
	  res.send('Not Allowed')
  } else {
		  //Authorize user
  const user={name:req.body.name};
  const accessToken=jwt.sign(user, ACCESS_TOKEN_SECRET) 
  res.json({accessToken:accessToken}) 
  
  }
 });

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
//raghav end