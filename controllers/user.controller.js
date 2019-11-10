const User = require('../models/user.model');
const mongoose = require('mongoose');

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