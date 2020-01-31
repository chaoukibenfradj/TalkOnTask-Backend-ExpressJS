const express = require('express');
const router = express.Router();
const meetingController = require('./../controllers/meeting.controller');

router.post('/addM', meetingController.add_meeting) ;

router.get('/chef/:id', meetingController.getMeetingByChefId) ;

router.get('/allM', meetingController.getAllMeetings);

router.get('/m/:id', meetingController.getMeetingById) ; 

router.get('/devmet/:meetingId', meetingController.getListDevByMeetingId) ;


module.exports = router;
