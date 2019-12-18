const Task = require('./../models/task.model');
const mongoose = require('mongoose');

exports.addTask = (req, res) => {
    projectId = req.body.projectId;
    devId = req.body.devId;
    taskTitle = req.body.taskTitle;
    taskDescription = req.body.taskDescription;
    start_date = req.body.start_date;
    end_date = req.body.end_date;
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        projectId: projectId,
        devId: devId,
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        start_date: start_date,
        end_date: end_date,
    });
    task.save()
        .then(data => {
            //Notify the user that he had new task - We need to Use Push Notification
            return res.status(201).json({
                message: 'ok',
                data: data._id
            });
        }).catch(err => {
            return res.status(500).json({
                error: JSON.stringify(err)
            });
        });;
}

exports.getTaskById = (req, res) => {
    Task.findOne({
        _id: req.params.id
    }).then(data => {
        return res.status(200).json({
            message: 'ok',
            data: data
        });
    }).catch(err => {
        return res.status(500).json({
            error: JSON.stringify(err)
        });
    });;
}

exports.getTaskByProjectId = (req, res) => {
    Task.find({
        projectId: req.params.id
    }).then(data => {
        return res.status(200).json({
            message: 'ok',
            data: data
        });
    }).catch(err => {
        return res.status(500).json({
            error: JSON.stringify(err)
        });
    });;
}

exports.getTaskByDeveloperId = (req, res) => {
    Task.find({
        devId: req.params.id
    }).then(data => {
        return res.status(200).json({
            message: 'ok',
            data: data
        });
    }).catch(err => {
        return res.status(500).json({
            error: JSON.stringify(err)
        });
    });;
}

exports.getTaskByDeveloperIdAndProjectId = (req, res) => {
    Task.find({
        devId: req.params.devId,
        projectId: req.params.projectId
    }).then(data => {
        return res.status(200).json({
            message: 'ok',
            data: data
        });
    }).catch(err => {
        return res.status(500).json({
            error: JSON.stringify(err)
        });
    });;
}
