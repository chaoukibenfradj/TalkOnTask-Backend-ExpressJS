const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/project.controller');

router.post('/save', projectController.add_project) ;
router.get('/pm/:id', projectController.getProjectByChefId) ;
router.get('/all', projectController.getAllProjects);

module.exports = router;