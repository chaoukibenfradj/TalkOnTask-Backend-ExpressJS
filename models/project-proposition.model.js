const mongoose = require('mongoose');

const projectPropositionSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: { type: String },
    description: { type: String },
    client: { type: String, ref: 'User' },
    cahier_charge: { type: String },
    created_at: { type: Date, default: Date.now },
    status: { type: String },
    updated_at: { type: Date }
});

module.exports = mongoose.model('ProjectProposition', projectPropositionSchema);