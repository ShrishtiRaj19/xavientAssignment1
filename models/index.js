const mongoose = require("mongoose");
const db_url = process.env.MONGODB_URL;
console.log("db_url", db_url)
mongoose.connect(db_url, {
	keepAlive: true,
  	useNewUrlParser: true,
  	useUnifiedTopology: true
}, (err, res)=>{
	console.log("err", err. res)
})

mongoose.set("debug", true) 
mongoose.Promise = Promise;

module.exports.Todo = require("./todo")
module.exports.employee = require("./employee")