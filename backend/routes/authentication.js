const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');


/* POST login. */
router.post('/login', function (req, res, next) {
    console.log("req.body in login....", req.body);
    // let user = req.body;
    //onsole.log("login auth route user------ ", user);
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log("err in login/local....", err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user, 'your_jwt_secret');

            return res.json({ user, token });
        });
    })
        (req, res);

});

module.exports = router;