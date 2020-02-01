const Project = require('./../models/project.model');
const mongoose = require('mongoose');
const User = require('./../models/user.model');
const Notification = require('./notification.controller');
const dateFormat = require('dateformat');
const ProjectProposition = require('./../models/project-proposition.model');
const Task = require('./../models/task.model');

exports.save_project_proposition = (req, res) => {
  console.log(req.body);
  console.log(JSON.stringify(req.body.file));
  const title = req.body.title;
  const description = req.body.description;
  const cahier_charge = req.file.path;
  const client = req.body.client;

  const projectProposition = new ProjectProposition({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    description: description,
    client: client,
    status: 'pending',
    cahier_charge: cahier_charge
  })
  projectProposition.save()
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

exports.get_proposition_by_client_id = (req, res) => {
  ProjectProposition.find({
    client: req.params.id
  })
    .populate('client')
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

exports.stat = (req, res) => {
  Task.find({
    projectId: req.params.id
  })
    .then(data => {
      return res.status(200).json({
        message: "ok",
        todo: data.filter(element => element.state === 'todo').length,
        doing: data.filter(element => element.state === 'doing').length,
        done: data.filter(element => element.state === 'done').length
      });
    })
    .catch(err => {
      console.log(err);
    })
}

exports.get_all_proposition = (req, res) => {
  ProjectProposition.find()
    .populate('client')
    .exec()
    .then(data => {
      return res.status(200).json({
        message: 'ok',
        data: data
      });
    }).catch(err => {
      console.log(err);
      return res.status(500).json({
        error: JSON.stringify(err)
      });
    });
}

exports.get_proposition_by_id = (req, res) => {
  ProjectProposition.findOne({
    _id: req.params.id
  })
    .populate('client')
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

            if (user.notification === 'true') {
              if (typeof (user.fcmToken) == 'undefined' || user.fcmToken !== '') {
                const title = `${user.firstName} : New Project Affected to You !`;
                console.log('Title :', title);
                const message = `You have been assigned to a new project : ${data.title}\nAt ${readableDate}`;
                Notification.sendAffectedProject(user.fcmToken, title, message, data._id);
              }
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



