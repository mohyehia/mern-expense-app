const mongoose = require('mongoose');
const User = require('../entity/user.entity');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    User.find({email: req.body.email})
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json({error: 'User already exists!'});
            } else {
                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(user => {
                                console.log(user);
                                res.status(201).json({
                                    message: 'User created successfully!',
                                    createdUser: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email,
                                        joined: user.joined
                                    }
                                });
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).json({error: err});
                            });
                    }
                });
            }
        }).catch();
}

exports.login = (req, res, next) => {
    User.find({email: req.body.email})
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Invalid Credentials!'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Invalid Credentials!'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            id: user[0]._id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: process.env.JWT_EXPIRATION
                        });
                    return res.status(200).json({
                        message: 'Authentication succeeded!',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Invalid Credentials!'
                });
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err});
        });
}