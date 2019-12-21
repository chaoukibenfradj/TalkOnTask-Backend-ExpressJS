const Message = require('./../models/message.model');
const mongoose = require('mongoose');
const LastMessage = require('./../models/last-message.model') ;

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
exports.saveLastMessage = (message) => {
    console.log('hey', message);
    return new Promise(function (resolve, reject) {
        LastMessage.findOneAndUpdate({
            $or: [{
                    toId: message.toId,
                    fromId: message.fromId,
                },
                {
                    toId: message.fromId,
                    fromId: message.toId,
                }
            ]
        }, {
            $set: {
                message: message.message,
                sentDate: message.sentDate
            }
        }).then(data => {
            console.log(data);
            console.log("Found last message");
            if (data == null) {
                const lastMessage = new LastMessage({
                    _id: new mongoose.Types.ObjectId(),
                    messageType: message.messageType,
                    fromId: message.fromId,
                    toId: message.toId,
                    message: message.message, 
                    messageType: message.messageType,
                    sentDate : message.sentDate, 
                    seenDate: message.seenDate
                })
                lastMessage.save()
                    .then(savedLastMessage => {
                        console.log("saved the last message");
                        resolve(savedLastMessage);
                    })
                    .catch(err => {
                        console.log("error saving the last message ! ");
                        reject(err);
                    })
            } else {
                resolve(data);
            }

        }).catch(err => {
            console.log(err);
            console.log("Error : Cant find the last message");

        })
    })


}
exports.getLastMessages = (req, res) => {
    const fromId = req.params.fromId;
    const toId = req.params.toId;
    LastMessage.find({
            $or: [{
                    toId: fromId,
                },
                {
                    fromId: fromId,
                }
            ]

        })
        .populate([{
                path: 'fromId'
            },
            {
                path: 'toId'
            }
        ])
        .exec()
        .then(data => {
            return res.status(200).json({
                data: data,
                message:'ok'
            });
        })
        .catch(err => {
            return res.status(404).json({
                err: err
            })
        })
}

exports.getLastMessage = (fromId, toId) => {
    return new Promise(function (resolve, reject) {
        LastMessage.findOne({
                $or: [{
                        fromId: fromId,
                        toId: toId
                    },
                    {
                        fromId: toId,
                        toId: fromId
                    }
                ]
            }).populate([{
                    path: 'fromId'
                },
                {
                    path: 'toId'
                }
            ])
            .exec().then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
    })
}
