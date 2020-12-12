var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
const bcrypt = require("bcryptjs");

router.get("/all", function(req, res, next) {
    models.prayerrequest.findAll({
            where: { Deleted: false }
        }, {
            include: [{
                model: models.users,
                // attributes: ["Username"]
            }]
        })
        .then(result => {
            console.log(result);
            res.json({ prayerrequest: result })
        });
})

///Get post for single Users///
router.get("/", function(req, res, next) {
    let token = req.headers.authorization;
    console.log(req.headers.authorization)
    if (token) {
        authService.verifyUser(token)
            .then(user => {
                if (user) {
                    models.prayerrequest
                        .findAll({
                            where: { UserId: user.UserId, Deleted: false }
                        })
                        .then(result => res.json({ prayerrequest: result }));
                } else {
                    res.status(401);
                    res.send('Invalid authentication token');
                }
            });
    } else {
        res.status(401);
        res.send('Must be logged in');
    }
});

router.get("/details/:id", function(req, res, next) {
    let token = req.headers.authorization;
    console.log(req.headers.authorization)
    if (token) {
        authService.verifyUser(token)
            .then(user => {
                if (user) {
                    models.prayerrequest
                        .findOne({
                            where: { UserId: user.UserId, Deleted: false, PrayerRequestId: req.params.id }
                        })
                        .then(result => res.json({ prayerrequest: result }));
                } else {
                    res.status(401);
                    res.send('Invalid authentication token');
                }
            });
    } else {
        res.status(401);
        res.send('Must be logged in');
    }
});

router.post("/newrequest", function(req, res, next) {
    let token = req.headers.authorization;
    console.log(req.headers)
    if (token) {
        authService.verifyUser(token)
            .then(user => {
                if (user) {
                    models.prayerrequest.findOrCreate({
                            where: {
                                UserId: user.UserId,
                                PrayerRequestBody: req.body.prayerRequestBody,
                                PrayerRequestTitle: req.body.prayerRequestTitle
                            }
                        })
                        .spread(function(result, created) {
                            console.log(result)
                            if (created) {
                                res.json({
                                    post: result,
                                    status: 'Prayer Request Successful!'
                                });
                            } else {
                                res.status(400);
                                res.send('Prayer request already exists');
                            }
                        })
                } else {
                    res.status(401);
                    res.send('Invalid authentication token');
                }
            });
    } else {
        res.status(401);
        res.send('Must be logged in');
    }
});
router.put('/update/:id', (req, res) => {
    let token = req.headers.authorization;
    authService.verifyUser(token).then(user => {

        if (user == null) {
            return res.json({ message: "User not logged in." })
        }
        models.prayerrequest.update(req.body, { where: { PrayerRequestId: parseInt(req.params.id) } })
            .then(result => res.json({ message: "Prayer request has been updated!" }))
            .catch(err => {
                res.status(400);
                res.json({ message: "There was an error updating the prayer request!" })
            })
    });
})

router.delete('/:id', (req, res) => {
    let token = req.headers.authorization;
    authService.verifyUser(token).then(user => {

        if (user == null) {
            return res.json({ message: "User not logged in." })
        }
        models.prayerrequest.update({ Deleted: true }, { where: { PrayerRequestId: parseInt(req.params.id) } })
            .then(result => res.json({ message: "Prayer request has been deleted!" }))
            .catch(err => {
                res.status(400);
                res.json({ message: "There was an error deleting the prayer request!" })
            })
    });
});

module.exports = router;