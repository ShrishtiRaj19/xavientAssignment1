'use strict;'
const express = require("express");
const app =  express();
const bodyparser = require('body-parser');
const db = require("./models/index.js")
var todoRoutes = require('./routes/todo')
var employeeRoutes = require('./routes/employee')
const router = express.Router();
var cors = require("cors")

app.use(bodyparser.json())
app.use('/api',router);
todoRoutes(router);
employeeRoutes(router);
app.use(cors({origin: '*'}))

// app.use((req, res, next)=> {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//     res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
//    next();
// });
const appPort = process.env.PORT ? process.env.PORT :4000 
app.listen(appPort, ()=>{
	console.log("listening to port", appPort, " !!");
})
