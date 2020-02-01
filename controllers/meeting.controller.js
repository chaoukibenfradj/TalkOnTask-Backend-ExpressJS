const Meeting = require('./../models/meeting.model');
const mongoose = require('mongoose');
const User = require('./../models/user.model');
const Notification = require('./notification.controller');
const dateFormat = require('dateformat');
const Project = require('./../models/project.model');
exports.add_meeting = (req, res) => {
  const subject = req.body.subject;
  const description = req.body.description;
  const chef = req.body.chef;
  const date = req.body.date;
  const duration = req.body.duration;
  const selectedProject = req.body.selectedProject;


  const meeting = new Meeting({
    _id: new mongoose.Types.ObjectId(),
    subject: subject,
    description: description,
    chef: chef,
    date: date,
    duration: duration,
    selectedProject: selectedProject
  })
  meeting.save().then(async (data) => {
    var readableDate = dateFormat(data.time, "HH:MM:ss yyyy-mm-dd");

    const project = await Project.findOne({
      _id: data.selectedProject
    })
      .populate('devTeamId')
      .exec();
    if (project) {

      if (project.devTeamId && project.devTeamId.length > 0) {
        try {
          project.devTeamId.forEach(user => {
            if (user.notification === 'true') {
              if (typeof (user.fcmToken) !== 'undefined' || user.fcmToken !== '') {
                const title = `${user.firstName} : New Meeting !`;
                console.log('Title :', title);
                const message = `You should participate to this meeting : ${data.subject}\nAt ${readableDate}`;
                Notification.sendAffectedMeeting(user.fcmToken, title, message, data._id);
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      }

    }
    return res.status(201).json({
      message: 'ok',
      data: data
    });

  }).catch(err => {
    console.log(err);
    return res.status(500).json({
      error: JSON.stringify(err)
    });
  });;
}



exports.getMeetingByChefId = (req, res) => {
  Meeting.find({
    chef: req.params.id
  })
    .populate([
      {
        path: 'selectedProject',
        model: 'Project'
      }
      ,
      {
        path: 'chef',
        model: 'User'
      }
    ])
    .exec()
    .then(data => {
      return res.status(200).json({
        message: 'ok',
        data: data
      });
    }).catch(err => {
      return res.status(500).json({
        error: JSON.stringify(err)
      });
    });
}


exports.getAllMeetings = (req, res) => {
  Meeting.find()
    .populate([
      {
        path: 'selectedProject',
        model: 'Project'
      },
      {
        path: 'chef',
        model: 'User'
      }
    ])
    .exec()
    .then(data => {
      return res.status(200).json({
        message: 'ok',
        data: data
      });
    }).catch(err => {
      return res.status(500).json({
        error: JSON.stringify(err)
      });
    });
}

exports.getMeetingById = (req, res) => {
  Meeting.findOne({
    _id: req.params.id
  }).populate([
    {
      path: 'selectedProject',
      model: 'Project'
    },
    {
      path: 'chef',
      model: 'User'
    }
  ])
    .exec()
    .then(data => {
      return res.status(200).json({
        message: 'ok',
        data: data
      });
    }).catch(err => {
      return res.status(500).json({
        error: JSON.stringify(err)
      });
    });
}

exports.getListDevByMeetingId = (req, res) => {
  const meetingId = req.params.projectId;
  Meeting.findOne({
    _id: meetingId
  })
    .populate([
      {
        path: 'selectedProject',
        model: 'Project'
      }
      ,
      {
        path: 'chef',
        model: 'User'
      }
    ])
    .exec()
    .then(data => {
      return res.status(200).json({
        message: "ok",
        data: data.devTeamId
      });
    }).catch(err => {
      return res.status(500).json({
        error: JSON.stringify(err)
      });
    });
}

