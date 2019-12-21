const express = require('express');
const router = express.Router();
const messageController = require('./../controllers/message.controller');

router.get('/get/:fromId/:toId', messageController.getAllForUserId) ;

module.exports = router;