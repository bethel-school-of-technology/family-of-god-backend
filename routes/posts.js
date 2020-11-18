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
                    models.posts
                        .findAll({
                            where: { UserId: user.UserId, Deleted: false }
                        })
                        .then(result => res.json({ posts: result }));
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

router.post("/newpost", function(req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        authService.verifyUser(token)
            .then(user => {
                if (user) {
                    models.posts.findOrCreate({
                            where: {
                                UserId: user.UserId,
                                PostBody: req.body.postBody,
                                PostTitle: req.body.postTitle
                            }
                        })
                        .spread(function(result, created) {
                            console.log(result)
                            if (created) {
                                res.json({
                                    post: result,
                                    status: 'Post Successful!'
                                });
                            } else {
                                res.status(400);
                                res.send('Post already exists');
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
        models.posts.update(req.body, { where: { PostId: parseInt(req.params.id) } })
            .then(result => res.json({ message: "Post has been updated!" }))
            .catch(err => {
                res.status(400);
                res.json({ message: "There was an error updating the post!" })
            })
    });
})

router.delete('/:id', (req, res) => {
    let token = req.cookies.jwt;
    authService.verifyUser(token).then(user => {

        if (user == null) {
            return res.json({ message: "User not logged in." })
        }
        models.posts.update({ Deleted: true }, { where: { PostId: parseInt(req.params.id) } })
            .then(result => res.json({ message: "Post has been deleted!" }))
            .catch(err => {
                res.status(400);
                res.json({ message: "There was an error deleting the post!" })
            })
    });
});

module.exports = router;