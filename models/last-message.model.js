const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lastMessageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    messageType: {
        type: String
    },
    fromId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    toId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String
    },
    messageType: {
        type: String
    },
    sentDate: {
        type: Date,
        default: Date.now
    },
    seenDate: {
        type: Date
    }
})

module.exports = mongoose.model('LastMessage', lastMessageSchema);