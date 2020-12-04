var express = require('express');
var router = express.Router();
var models = require('../models')
const authService = require("../services/auth");

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// Create new user //
router.post('/signup', function(req, res, next) {
    models.users
        .findOrCreate({
            where: {
                Username: req.body.username
            },
            defaults: {
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                Email: req.body.email,
                // Password: req.body.password
                Password: authService.hashPassword(req.body.password)
            }
        })
        .spread(function(result, created) {
            if (created) {
                res.json({
                    status: 200,
                    message: 'User successfully created'
                });
            } else {
                res.json({
                    status: 401,
                    message: 'This user already exists'
                });
            }
        });
});

// Login user and return JWT as cookie
router.post('/login', function(req, res, next) {
    models.users.findOne({
        where: {
            Username: req.body.username,
            // Password: req.body.password
        }
    }).then(user => {
        if (!user) {
            console.log('User not found')
            return res.status(401).json({
                message: "Login failed"
            });
        }
        if (user) {
            if (authService.comparePasswords());
            let token = authService.signUser(user);
            res.cookie("jwt", token)
            res.json({
                status: 200,
                message: 'Login Successful!',
                // jwt: token

            })
        } else {
            console.log('Email and Password did not match our records');
            res.send('Try login again with correct information')
        }
    });
});

router.get('/logout', function(req, res, next) {
    res.cookie('jwt', "", { expires: new Date(0) });
    res.json({
        status: 'Logout Successful',
        message: 'Hope to see you again soon!'
    })

});

module.exports = router;