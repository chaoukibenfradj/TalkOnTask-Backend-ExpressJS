const User = require('../models/user.model');
const mongoose = require('mongoose');
const jwtToken = require('jsonwebtoken');
exports.addUser = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const profilPhoto = req.body.profilPhoto;
    const userRole = req.body.userRole;
    const birthday = req.body.birthday;
    const gender = req.body.gender;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        profilPhoto: profilPhoto,
        userRole: userRole,
        birthday: birthday,
        gender: gender
    });
    user.save().then(data => {
        return res.status(201).json(
            {
                message: 'ok',
                data: data
            }
        );
    }).catch(
        err => {
            return res.status(500).json(
                {
                    message: 'err',
                    err: JSON.stringify(err)
                }
            )
        }
    )
}

exports.getAllUsers = (req, res) => {
    User.find().then(data => {
        return res.status(200).json({
            message: 'ok',
            data: data
        });
    }).catch(err => {
        return res.status(500).json({
            error: JSON.stringify(err)
        });
    });
}

exports.login = (req, res) => {
    email = req.body.email;
    password = req.body.password;
    User.findOne({
        email: email,
        password: password
    }).then(data => {
        if (data == null) {
            return res.status(401).json({
                status: 'ok',
                message: 'unauthorized'
            })
        } else {
            const token = jwtToken.sign({ user: data }, 'key', { expiresIn: '10h' });
            return res.status(200).json({
                status: 'ok',
                data: token
            })
        }
    })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: JSON.stringify(err)
            });
        });
}

exports.getUserByType = (req, res) => {
    userType = req.params.userType;
    User.find({
        userRole: userType
    }).then(data => {
        return res.status(200).json({
            message: 'ok',
            data: data
        });
    }).catch(err => {
        return res.status(500).json({
            error: JSON.stringify(err)
        });
    });;
}

exports.getUserById = (req, res) => {
    id = req.params.id;
    User.findOne({
        _id: id
    })
        .then(data => {
            return res.status(200).json({
                message: 'ok',
                data: data
            });
        }).catch(err => {
            return res.status(500).json({
                error: JSON.stringify(err)
            });
        });
}
exports.updateFCMToken = (req, res) => {
    const token = req.body.token;
    const id = req.params.id;
    User.findOneAndUpdate({
        _id: id
    },
        {
            fcmToken: token
        }).then(data => {
            console.log(data);
            return res.status(200).json({
                message: 'ok',
            });
        }).catch(err => {
            return res.status(500).json({
                error: JSON.stringify(err)
            });
        });
}