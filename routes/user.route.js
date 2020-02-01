const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/add', userController.addUser);
router.post('/login', userController.login) ;
router.get('/all', userController.getAllUsers);
router.get('/type/:userType', userController.getUserByType) ;
router.get('/id/:id', userController.getUserById) ;
router.patch('/token/:id', userController.updateFCMToken); 
router.patch('/notification/:id', userController.change_notification); 



module.exports = router;