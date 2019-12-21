const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const Mongoose = require("mongoose");
const http = require("http");
const cors = require('cors')

const userRoute = require('./routes/user.route');
const projectRoute = require('./routes/project.route');
const taskRoute = require('./routes/task.route');
const messageRoute = require('./routes/message.route');
const msgController = require('./controllers/message.controller');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

let db = "mongodb://heroku_s5qm8qz9:qj02hmi23lbhvgdhqvbq507g3b@ds257648.mlab.com:57648/heroku_s5qm8qz9";

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
app.use('/task', taskRoute);
app.use('/project', projectRoute);
app.use('/message', messageRoute);



const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
	io.emit('test', {});
	client.on('disconnect', () => { /* … */ });
	client.on('send-message', (message) => {
		console.log(message);
		msgController.saveMessage(message).then(data => {
			console.log(data);
			io.emit('msg:' + message.toId + ':' + message.fromId, data);
			io.emit('sent:' + message.fromId + ':' + message.toId, data);
		});
	});
});

server.listen(port, function () {
	console.log("Server listening on port " + port);
});
module.exports = io;
