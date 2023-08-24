// security info
const userModel = require('../models/user.js');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;


// Configure local strategy
passport.use(new LocalStrategy((name, password, done) => {
    console.log("name, password", name, password);
    usernameField: 'name';
    passwordField: 'password';
}, function (name, password, cb) {
    console.log("name, password", name, password);
    //Assume there is a DB module pproviding a global UserModel
    return userModel.find({ name, password })
        .then(user => {
            if (!user) {
                return cb(null, false, { message: 'Incorrect email or password.' });
            }

            return cb(null, user, {
                message: 'Logged In Successfully'
            });
        })
        .catch(err => {
            return cb(err);
        });
}


));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    function (jwtPayload, cb) {

        //find the user in db if needed
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));
