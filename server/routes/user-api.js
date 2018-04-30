var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
router.post('/signup', function (req, res, next) {

    var signup = new User();
    signup.firstname = req.body.firstname;
    signup.lastname = req.body.lastname;
    signup.email = req.body.email;
    signup.password = bcrypt.hashSync(req.body.password,10);
    signup.save(function (err, newuser) {
        if (err) {
            res.send("Error saving user");
        } else {
            res.json(newuser);
        }
    });
})
router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id,
            username:user.firstname
        });
    });
});


module.exports = router;
