const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    projectId: { type: String, ref: 'Project' },
    devId: { type: String, ref: 'User' },
    taskTitle: { type: String },
    taskDescription: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    state: { type: String, default: 'todo' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('Task', taskSchema);