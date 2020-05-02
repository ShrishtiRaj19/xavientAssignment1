'use strict;'
const express = require("express");
const app =  express();
const bodyparser = require('body-parser');
const db = require("./models/index.js")
var todoRoutes = require('./routes/todo')
var employeeRoutes = require('./routes/employee')
var usersRoutes = require('./routes/users')
const router = express.Router();
var cors = require("cors")

app.use(bodyparser.json())
app.use('/api',router);
todoRoutes(router);
employeeRoutes(router);
usersRoutes(router);
app.use(cors({origin: '*'}))

app.use("/userlist", express.static(__dirname + '/userlist.json'));
console.log("express.static(__dirname + './userlist.json')", __dirname + '/userlist.json')
const appPort = process.env.PORT ? process.env.PORT :4000 
app.listen(appPort, ()=>{
	console.log("listening to port", appPort, " !!");
})

