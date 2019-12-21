const Message = require('./../models/message.model');
const mongoose = require('mongoose');


exports.saveMessage = (message) => {
    return new Promise(function (resolve, reject) {
        const msg = new Message({
            _id: new mongoose.Types.ObjectId(),
            fromId: message.fromId,
            toId: message.toId,
            messageType: message.messageType,
            message: message.message
        });
        msg.save()
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err);
            });
    })
}
exports.getAllForUserId = (req, res) => {
    const fromId = req.params.fromId;
    const toId = req.params.toId;
    Message.find({
        $or: [{
            toId: toId,
            fromId: fromId,
        },
        {
            toId: fromId,
            fromId: toId,
        }
        ]
    })
        .then(data => {
            return res.status(200).json({
                message: 'ok',
                data: data
            });
        })
        .catch(err => {
            return res.status(404).json({
                err: err
            })
        })
}
