const express = require('express')
const router = express.Router()

const axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();

// define the home page route

// generic get route to test avaialablity
router.get('/', function (req, res,) {
  //console.log("req.body.barcode)",req.body.barcode)
  res.status(200).send('Inventory home page')
    })


// route to retrieve record by barcode
router.post('/', async function (req, res) {
  try {
  console.log("req.body.barcode.text)",req.body.barcode.text)
  const barcode = req.body.barcode.text
     //item retrieve query to Alma backend. API URL, Item Barcode, and APIKEY
     const { data } = await axios.get(process.env.EXLIBRIS_API_ROOT + process.env.EXLIBRIS_API_PATH + barcode + '&apikey=' + process.env.EXLIBRIS_API_BIB_GET_KEY + "&expand=p_avail");
console.log("data", data)
res.status(200).send({"barcode": `${req.body.barcode.text}`})
  } catch (error) {
    console.log("retreiveItemErrorAPI Error:   ", error.message);
    res.send(error);
  }
  })

  module.exports = router;