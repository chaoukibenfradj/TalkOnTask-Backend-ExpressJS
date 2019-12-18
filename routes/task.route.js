const express = require('express');
const router = express.Router();
const taskCtrl = require('./../controllers/task.controller') ; 

router.post('/add',taskCtrl.addTask) ;
router.get('/one/:id', taskCtrl.getTaskById) ; 
router.get('/project/:id', taskCtrl.getTaskByProjectId) ; 
router.get('/dev/all/:id', taskCtrl.getTaskByDeveloperId) ; 
router.get('/dev/project/:devId/:projectId', taskCtrl.getTaskByDeveloperId) ; 


module.exports = router;