const Project = require('./../models/project.model');
const mongoose = require('mongoose');
const User = require('./../models/user.model');
const Notification = require('./notification.controller');
const dateFormat = require('dateformat');


exports.add_project = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const chef = req.body.chef;
  const estimated_start_date = req.body.estimated_start_date;
  const estimated_end_date = req.body.estimated_end_date;
  const devTeam = req.body.devTeamId.split(':');
  console.log(devTeam);

  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    description: description,
    chef: chef,
    estimated_start_date: estimated_start_date,
    estimated_end_date: estimated_end_date,
    devTeamId: devTeam
  })
  project.save().then(async (data) => {
    var readableDate = dateFormat(data.time, "HH:MM:ss yyyy-mm-dd");
    if (data.devTeamId.length > 0) {
      try {

        const users = await User.find({
          _id: { $in: data.devTeamId }
        });

        if (users) {
          users.forEach(user => {
            if (typeof (user.fcmToken) == 'undefined' || user.fcmToken !== '') {
              const title = `${user.firstName} : New Project Affected to You !`;
              console.log('Title :',title);
              const message = `You have been assigned to a new project : ${data.title}\nAt ${readableDate}`;
              Notification.sendAffectedProject(user.fcmToken, title, message, data._id);
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


exports.getProjectByChefId = (req, res) => {
  Project.find({
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


exports.getAllProjects = (req, res) => {
  Project.find().then(data => {
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

exports.getProjectById = (req, res) => {
  Project.findOne({
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

exports.getListDevByProjectId = (req, res) => {
  const projectId = req.params.projectId;
  Project.findOne({
    _id: projectId
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

exports.getAllDevProjects = (req, res) => {
  const devId = req.params.id;
  Project.find({
    devTeamId: devId
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



