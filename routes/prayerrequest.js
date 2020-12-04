var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
const bcrypt = require("bcryptjs");


///Get post for single Users///
router.get("/", function(req, res, next) {
    let token = req.cookies.jwt;
    console.log(token)
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

router.post("/newrequest", function(req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        authService.verifyUser(token)
            .then(user => {
                if (user) {
                    models.prayerrequest.findOrCreate({
                            where: {
                                PrayerRequestId: user.UserId,
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
router.put('/:id', (req, res) => {
    let token = req.cookies.jwt;
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
    let token = req.cookies.jwt;
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