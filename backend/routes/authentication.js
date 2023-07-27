const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js');
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

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
        res.status(200).send(dataToSave);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }




});

//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API');
});

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API');
});

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API');
});

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API');
});

module.exports = router;