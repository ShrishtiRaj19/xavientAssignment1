const mongoose = require("mongoose");
const db_url = process.env.MONGODB_URL;
mongoose.connect(db_url, {
	keepAlive: true,
  	useNewUrlParser: true,
  	useUnifiedTopology: true
})

mongoose.set("debug", true) 
mongoose.Promise = Promise;

module.exports.Todo = require("./todo")
module.exports.employee = require("./employee")