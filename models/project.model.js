const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: { type: String },
    description: { type: String },
    chef: { type: String, ref: 'User' },
    devTeamId : [{type : String , ref : 'User'}],
    estimated_start_date: { type: Date },
    estimated_end_date: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('Project', projectSchema);