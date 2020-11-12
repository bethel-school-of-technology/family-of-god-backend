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
                res.send('User successfully created');
            } else {
                res.send('This user already exists');
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
            res.cookie('jwt', token);
            res.send('Login successful');
        } else {
            console.log('Wrong password');
            res.redirect('login')
        }
    });
});

module.exports = router;