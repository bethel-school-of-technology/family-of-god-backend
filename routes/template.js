
//COPY PASTE THIS AUTH ROUT FOR EASY USE
router.post("/newcomment/:postId", function(req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        authService.verifyUser(token)
            .then(user => {
                if (user) {
                    // add any code needed here
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