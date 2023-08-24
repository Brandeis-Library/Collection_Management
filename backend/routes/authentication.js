const express = require('express');
const router = express.Router();
//const userModel = require('../models/user.js');
//const dotenv = require("dotenv");
//dotenv.config();
const jwt = require('jsonwebtoken');
const passport = require('passport');



// Route default method
router.get('/', (req, res) => {
    console.log("login req.body----------", req.body);
    res.send("Authentation home route.");
});

/* POST login. */
router.post('/login', function (req, res, next) {
    console.log("login req.body----------", req.body);
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({ user, token });
        });
    })(req, res);
});


module.exports = router;