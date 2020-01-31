const Meeting = require('./../models/meeting.model');
const mongoose = require('mongoose');
const User = require('./../models/user.model');
const Notification = require('./notification.controller');
const dateFormat = require('dateformat');

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
     if (data.selectedProject.devTeamId.length > 0) {
        try {
          const users = await User.find({
            _id: { $in: data.selectedProject.devTeamId }
          });
          if (users) {
            users.forEach(user => {
              if (typeof (user.fcmToken) == 'undefined' || user.fcmToken !== '') {
                const title = `${user.firstName} : New Meeting affected to you !`;
                console.log('Title :',title);
                const message = `You should participate to this meeting : ${data.title}\nAt ${readableDate}`;
                Notification.sendAffectedMeeting(user.fcmToken, title, message, data._id);
              }
            });
          }
  
        } catch (error) {
          console.log(error);
          
        }
      }
  
      return res.status(201).json({
        message: 'ok',
        data: data
      });
  
    }).catch(err => {
      return res.status(500).json({
        error: JSON.stringify(err)
      });
    });;
  }


  
exports.getMeetingByChefId = (req, res) => {
  Meeting.find({
    chef: req.params.id
  })
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
  Meeting.find().then(data => {
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
      path: 'devTeamId',
      model: 'User'
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
        path: 'devTeamId',
        model: 'User'
      },
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

