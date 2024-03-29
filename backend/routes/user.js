const express = require('express');
const router = express.Router();
const userModel = require('../models/user.js');
const dotenv = require("dotenv");
dotenv.config();


// Route default method
router.get('/', (req, res) => {
    res.send("Authentation home route.");
});

/* GET user profile. */
// router.get('/profile', function (req, res, next) {
//     res.send(req.user);
// });

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

// //Get all Method
// router.get('/getAll', async (req, res) => {
//     try {
//         const data = await userModel.find();
//         res.status(200).json({ data });
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({ message: err.message });
//     }
// });

//Find one user
router.post('/getOne', async (req, res, next) => {
    try {
        let nameObj = { "name": req.body.obj.username };
        const data = await userModel.find(nameObj);
        res.status(200).json(data);
    } catch (error) {
        console.error("\n\n\nerror.message", error.message);
        next({ status: false, message: error.message });

    }
});

// //Update by ID Method
// router.patch('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };
//         const result = await userModel.findByIdAndUpdate(id, updatedData, options);
//         res.status(200).send(result);
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({ message: err.message });
//     }
// });

//Delete by ID Method
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await userModel.findByIdAndDelete(id);
//         res.status(200).send(`User with id ${id} has been deleted. \n\n ${data}`);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }

// });

module.exports = router;