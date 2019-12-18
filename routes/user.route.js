const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/add', userController.addUser);
router.post('/login', userController.login) ;
router.get('/all', userController.getAllUsers);
module.exports = router;