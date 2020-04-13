const mongoose = require("mongoose");
const db_url ="mongodb+srv://shrishti:mongodb123@cluster0-gri1n.mongodb.net/test"

mongoose.connect(db_url, {
	keepAlive: true,
  	useNewUrlParser: true,
  	useUnifiedTopology: true
})

mongoose.set("debug", true) 
mongoose.Promise = Promise;

module.exports.Todo = require("./todo")
module.exports.employee = require("./employee")