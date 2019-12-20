const Project = require('./../models/project.model');
const mongoose = require('mongoose');

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
  project.save().then(data => {
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
