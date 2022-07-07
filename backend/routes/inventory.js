const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const lc = require("lc_call_number_compare");

const retrieveDataItems = require("../helperFunctions/retrieveItemData");
const replacementCost = require("../helperFunctions/replacementCost");

// route to retrieve record by barcode. Initial inventory data retrieval.
// used a post route to a "get/retrieval" as the barcode needs to be shared as payload.
router.post("/", async function (req, res, next) {
  try {
    const barcode = req.body.barcode.text;
    //item retrieve query to Alma backend. API URL, Item Barcode, and APIKEY
    const { data } = await axios.get(
      process.env.EXLIBRIS_API_ROOT +
        process.env.EXLIBRIS_API_PATH +
        barcode +
        "&apikey=" +
        process.env.EXLIBRIS_API_BIB_GET_KEY +
        "&expand=p_avail",
    );
    //send data to a helper function to format the data for the frontend data store.
    const dataObj = retrieveDataItems(data);
    res.status(200).send({ dataObj: dataObj });
  } catch (error) {
    console.error("retreiveItemErrorAPI Error:   ", error.message);
    //sends the error message to the on board express error handler.
    next({ status: false, message: error.message });
  }
});

// route for sending the updating data from the item update frontend form.
router.put("/itemform", async function (req, res, next) {
  try {
    const dataObj = req.body.obj;
    let { data } = await axios.put(
      process.env.EXLIBRIS_API_ROOT +
        "/almaws/v1/bibs/" +
        dataObj.bib_data.mms_id +
        "/holdings/" +
        dataObj.holding_data.holding_id +
        "/items/" +
        dataObj.item_data.pid +
        "?apikey=" +
        process.env.EXLIBRIS_API_BIB_UPDATE_KEY,
      dataObj,
    );
    res.json(data);
  } catch (error) {
    console.error("updateItemErrorAPI Error:   ", error.message);
    next({ status: false, message: error.message });
  }
});

// Route to retreive 538a field data currently being used for committed to retain.
router.put("/538Text", async function (req, res, next) {
  try {
    const mmsId = req.body.obj.bib_data.mms_id;
    const holdingId = req.body.obj.holding_data.holding_id;
    //item retrieve query to Alma backend. Holdings API URL, Item Barcode, and APIKEY
    const { data } = await axios.get(
      process.env.EXLIBRIS_API_ROOT +
        process.env.EXLIBRIS_API_PATH_HOLDINGS +
        mmsId +
        "/holdings/" +
        holdingId +
        "?apikey=" +
        process.env.EXLIBRIS_API_BIB_GET_KEY,
    );

    // Pulling out the XML hodings data and pulls out any text info in the 538a field.
    // The system no longer just searches for committed to retain only.
    let string583a = "";
    let document = data.anies[0];
    document = document.toString();
    let xmlParsedDoc = await new dom().parseFromString(document);
    string583a = xpath.select("//datafield[@tag=583]/subfield", xmlParsedDoc);
    if (string583a.length === 0) {
      string583a = "----";
    } else {
      string583a = string583a[0].toString();
      string583a = string583a.replace(/<subfield(.*?)>/g, "");
      string583a = string583a.replace(/<\/subfield>/g, "");
    }
    // Just sends back the string text. Not in obj form.
    res.send(string583a);
  } catch (error) {
    console.error("updateItemErrorAPI Error:   ", error.message);
    next({ status: false, message: error.message });
  }
});

// route to do the checking of order of call numbers for order of books on the shelves.
router.put("/callNumCheck", async function (req, res, next) {
  try {
    //let firstCal cd  Does not work, Needs to be sent and changed on the front end.
    const x = req.body.x;
    const y = req.body.y;
    // uses npm package ld to see if the LC call numbers are in the proper order.
    let result = await lc.lte(x, y);
    //status is true or false
    res.json({ status: result });
  } catch (error) {
    console.error("uppdate callNumCheck API Error:   ", error.message);
    next({ status: false, message: error.message });
  }
});

// Route to do autoupdate of Inventory Date and Check Replacement Cost
router.put("/", async function (req, res) {
  try {
    const dataObj = req.body.respDataObj.dataObjTotal;

    let cost = dataObj.item_data.replacement_cost;
    // use helper function to check for replacement cost.
    cost = await replacementCost(cost);
    dataObj.item_data.replacement_cost = cost;

    const date = new Date();
    dataObj.item_data.inventory_date = date;

    let { data } = await axios.put(
      process.env.EXLIBRIS_API_ROOT +
        "/almaws/v1/bibs/" +
        dataObj.bib_data.mms_id +
        "/holdings/" +
        dataObj.holding_data.holding_id +
        "/items/" +
        dataObj.item_data.pid +
        "?apikey=" +
        process.env.EXLIBRIS_API_BIB_UPDATE_KEY,
      dataObj,
    );
    // sends updated data obj received from Alma back to the front end.
    res.json(data);
  } catch (error) {
    console.error("updateItemErrorAPI Error:   ", error.message);
    next({ status: false, message: error.message });
  }
});

// generic get route @ root to test avaialablity
router.get("/", function (req, res, next) {
  try {
    res.status(200).send("Inventory home page");
  } catch (error) {
    console.error("inventory Root Get Error:   ", error.message);
    next({ status: false, message: error.message });
  }
});

module.exports = router;
