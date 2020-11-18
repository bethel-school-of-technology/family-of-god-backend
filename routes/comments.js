var express = require('express');
var router = express.Router();
var models = require('../models');
var authService = require('../services/auth');
const bcrypt = require("bcryptjs");
console.log(models.comments)

// router.get("/", function(req, res, next) {
//     res.send('comments');
// });

///Get comment for single Users///
router.get("/", function(req, res, next) {
    let token = req.cookies.jwt;
    console.log(token);
    if (token) {
        authService.verifyUser(token)
            .then(user => {
                if (user) {
                    models.comments
                        .findAll({
                            where: { UserId: user.UserId, Deleted: false }
                        })
                        .then(result => res.json({ comments: result }));
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

router.post("/newcomment/:postId", function(req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        authService.verifyUser(token)
            .then(user => {
                if (user) {
                    models.comments.findOrCreate({
                            where: {
                                UserId: user.UserId,
                                PostId: req.params.postId,
                                CommentBody: req.body.commentBody
                            },
                            defaults: {
                                CommentBody: req.body.commentBody
                            }
                        })
                        .spread(function(result, created) {
                            console.log(result)
                            if (created) {
                                res.json({
                                    comment: result,
                                    status: 'Comment Successful!'
                                });
                            } else {
                                res.status(400);
                                res.send('Comment already exists');
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

module.exports = router;