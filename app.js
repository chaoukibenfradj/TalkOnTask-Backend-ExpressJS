const express = require('express') ; 
const app = express() ;
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const http = require("http");
const cors = require('cors')

const userRoute = require('./routes/user.route');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

let db = "mongodb://127.0.0.1:27017/ProjectManager";

Mongoose.connect(db || process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, db) {
	if (err) {
		console.log("Not successfully connected to DB");
		throw err;
	} else {
		console.log("Connected to DB");
	}
});
app.use(cors());

app.use('/user', userRoute);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, function () {
	console.log("Server listening on port " + port);
});