const express = require('express');
const router = express.Router();
const taskCtrl = require('./../controllers/task.controller');

router.post('/addT', taskCtrl.addTask);
router.get('/id/:id', taskCtrl.getTaskById);
router.get('/t/:id', taskCtrl.getTaskByProjectId);
router.get('/dev/all/:id', taskCtrl.getTaskByDeveloperId);
router.get('/dev/project/:devId/:projectId', taskCtrl.getTaskByDeveloperId);
router.patch('/update/state/:id', taskCtrl.updateTaskState);
router.delete('/delete/:id', taskCtrl.deleteTask);
router.patch('/update/:id', taskCtrl.updateTaskDetails);
router.post('/req/', taskCtrl.saveTaskRequest);
router.get('/req/dev/:id', taskCtrl.getTaskReqByDevId);
router.delete('/req/:id', taskCtrl.deleteTaskRequest);
router.patch('/req/ok/:id', taskCtrl.acceptTaskRequest);

module.exports = router;