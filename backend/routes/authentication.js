const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js');
const dotenv = require("dotenv");
dotenv.config();
const passport = require('passport');

// //  passport routes
// app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
//     // Generate and send a JWT token
//     // ...
// });

// app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.json({ message: 'This is a protected route.' });
// });

// Route default method
router.get('/', (req, res) => {
    res.send("Authentation home route.");
});

//Post Method
router.post('/post', async (req, res) => {
    const data = new userModel({
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
    });
    try {
        const dataToSave = await data.save();
        console.log("dataToSave---------", dataToSave);
        res.status(201).send(dataToSave);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await userModel.find();
        res.status(200).json({ data });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {

        const data = await userModel.findById(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await userModel.findByIdAndUpdate(id, updatedData, options);
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await userModel.findByIdAndDelete(id);
        res.status(200).send(`User with id ${id} has been deleted. \n\n ${data}`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

});

module.exports = router;