const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    fromId: { type: String, ref: 'User' },
    toId: { type: String, ref: 'User' },
    sentDate: { type: Date, default: Date.now },
    seenDate: { type: Date },
    messageType: { type: String },
    message: { type: String }
});

module.exports = mongoose.model('Message', messageSchema);
