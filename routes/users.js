var express = require('express');
var router = express.Router();
var models = require('../models')
const authService = require("../services/auth");


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// Create new user if one doesn't exist
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
                Password: req.body.password
            }
        })
        .spread(function(result, created) {
            if (created) {
                res.json({
                    staus: 200,
                    message: 'User successfully created'
                });
            } else {
                res.json({
                    staus: 401,
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
            Password: req.body.password
        }
    }).then(user => {
        if (!user) {
            console.log('User not found')
            return res.status(401).json({
                message: "Login failed"
            });
        }
        if (user) {
            let token = authService.signUser(user);
            res.json({
                    status: 200,
                    message: 'Login Successful!',
                    jwt: token
                })
                // res.cookie('jwt', token);
                // res.send('Login successful');
        } else {
            console.log('Wrong password');
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