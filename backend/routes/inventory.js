var express = require('express')
var router = express.Router()

// define the home page route

router.get('/', function (req, res) {
  console.log("req.body)",req.body)
      res.status(200).send('Inventory "get" home page')
    })

router.post('/', function (req, res) {
console.log("req.body)",req.body)
    res.status(200).send('Inventory home page')
  })

  module.exports = router;