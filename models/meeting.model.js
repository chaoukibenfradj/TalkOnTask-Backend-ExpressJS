const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    subject: { type: String },
    description: { type: String },
    chef: { type: String, ref: 'User' },
    date: { type: String },
    duration: {type: String},
    selectedProject: { type: String, ref: 'Project' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('Meeting', meetingSchema);