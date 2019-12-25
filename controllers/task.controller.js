const Task = require('./../models/task.model');
const mongoose = require('mongoose');
const TaskRequest = require('./../models/task-request.model');

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
        });
}



exports.getTaskById = (req, res) => {
    Task.findOne({
        _id: req.params.id
    })
        .populate('devId')
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

exports.updateTaskState = (req, res) => {
    const id = req.params.id;
    const newState = req.body.state;
    Task.findOneAndUpdate({
        _id: id
    },
        {
            state: newState
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

exports.deleteTask = (req, res) => {
    const id = req.params.id;
    Task.findOneAndDelete({
        _id: id
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

exports.updateTaskDetails = (req, res) => {
    const id = req.params.id;
    const newTask = req.body.newTask;
    console.log(id, newTask);
    Task.findOneAndUpdate({
        _id: id
    },
        newTask
    )
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

exports.saveTaskRequest = async (req, res) => {
    const devId = req.body.devId;
    const taskId = req.body.taskId;
    const requestDate = req.body.requestDate;
    const projectId = req.body.projectId;
    try {
        const nbTask = await TaskRequest.find({
            taskId: taskId,
            devId: devId,
            projectId: projectId
        });
        if (nbTask.length == 0) {
            const taskRequest = new TaskRequest({
                _id: new mongoose.Types.ObjectId(),
                devId: devId,
                taskId: taskId,
                projectId: projectId,
                requestDate: requestDate
            });
            taskRequest.save().then(data => {
                return res.status(200).json({
                    message: 'ok',
                    data: data
                });
            }).catch(err => {
                return res.status(500).json({
                    error: JSON.stringify(err)
                });
            });
        } else {
            console.log('exist');
            return res.status(200).json({
                message: "ok",
                data: 'exist'
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: JSON.stringify(err)
        });
    }
}

exports.acceptTaskRequest = (req, res) => {
    const id = req.params.id;
    TaskRequest.findOne({ _id: id })
        .then(data => {
            Task.findOneAndUpdate({ _id: data.taskId }, { devId: data.devId })
                .then(data1 => {
                    TaskRequest.findOneAndDelete({ _id: id })
                        .then(data2 => {
                            return res.status(200).json({
                                message: 'ok',
                                data: data2
                            });
                        }).catch(err => {
                            return res.status(500).json({
                                error: JSON.stringify(err)
                            });
                        })
                }).catch(err => {
                    return res.status(500).json({
                        error: JSON.stringify(err)
                    });
                });
        })
        .catch(err => {
            return res.status(500).json({
                error: JSON.stringify(err)
            });
        });
}

exports.deleteTaskRequest = (req, res) => {
    const id = req.params.id;
    TaskRequest.findOneAndDelete({ _id: id })
        .then(data2 => {
            return res.status(200).json({
                message: 'ok',
                data: data2
            });
        }).catch(err => {
            return res.status(500).json({
                error: JSON.stringify(err)
            });
        })
}

exports.getTaskReqByDevId = (req, res) => {
    const id = req.params.id;
    TaskRequest.find({
        devId: id
    }, null, { sort: { requestDate: -1 } })
        .populate(
            [
                { model: 'User', path: 'devId' },
                { model: 'Project', path: 'projectId' },
                { model: 'Task', path: 'taskId' }
            ]
        )
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
