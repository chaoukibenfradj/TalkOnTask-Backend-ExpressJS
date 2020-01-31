const express = require('express');
const router = express.Router();
const projectController = require('./../controllers/project.controller');
const multer = require('multer') ;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/docs');
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + "_" + file.originalname + ".pdf");
    }
});

const upload = multer({
    storage: storage
});

router.post('/save', projectController.add_project);
router.get('/pm/:id', projectController.getProjectByChefId);
router.get('/all', projectController.getAllProjects);
router.get('/p/:id', projectController.getProjectById);
router.get('/dev/:projectId', projectController.getListDevByProjectId);
router.get('/devp/:id', projectController.getAllDevProjects);
router.post('/proposition', upload.single('file'), projectController.save_project_proposition);
router.get('/proposition/client/:id', projectController.get_proposition_by_client_id) ;
router.get('/proposition/:id', projectController.get_proposition_by_id) ;
router.get('/proposition', projectController.get_all_proposition) ;

router.get('/stats/:id', projectController.stat);

module.exports = router;