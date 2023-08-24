// security info
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Configure local strategy
passport.use(new LocalStrategy((name, password, done) => {
    usernameField: 'name';
    passwordField: 'password';
}, async (name, password, callback) => {


    try {

        const user = await userModel.find(name, password);
        console.log("user------------", user);
        if (!user) {
            return callback(null, false, { message: 'Incorrect email or password.' });
        }
        return callback(null, user, { message: 'Logged In Successfully' });


    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }

}));
