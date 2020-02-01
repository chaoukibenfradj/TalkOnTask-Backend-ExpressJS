const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    email: { type: String },
    password: { type: String },
    profilPicture: { type: String },
    birthday: { type: Date },
    userRole: { type: String },
    gender: { type: String },
    notification: { type: String },
    fcmToken: { type: String, default: '' }
})

module.exports = mongoose.model('User', userSchema);