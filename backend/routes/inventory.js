var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
    res.status(200).send('Inventory home page')
  })

  module.exports = router;