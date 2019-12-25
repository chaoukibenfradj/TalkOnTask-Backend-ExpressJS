const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    devId: { type: String, ref: 'User' },
    taskId: { type: String, ref: 'Task' },
    projectId: { type: String, ref: 'Project' },
    requestDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TaskRequest', messageSchema);
