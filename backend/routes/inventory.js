const express = require("express");
const router = express.Router();

const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const lc = require("lc_call_number_compare");

const retrieveDataItems = require("../helperFunctions/retrieveItemData");
const replacementCost = require("../helperFunctions/replacmentCost");
const { response } = require("express");

// define the home page route

// route to retrieve record by barcode
router.post("/", async function (req, res) {
  try {
    console.log("req.body.barcode.text)", req.body.barcode.text);
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
    //console.log("physical_condition ======== ", data.item_data.physical_condition);
    const dataObj = retrieveDataItems(data);
    //console.log("dataObj", dataObj);
    res.status(200).send({ dataObj: dataObj });
  } catch (error) {
    console.log("retreiveItemErrorAPI Error:   ", error.message);
    res.send(error);
  }
});

router.put("/itemform", async function (req, res) {
  try {
    // console.log("inside iventory itemform route -----------------");
    // console.log("req.body", req.body);
    // console.log("itemform dataObj from the frontend ------------- ", req.body.obj.internalNote3);
    const dataObj = req.body.obj.dataObj;
    if (req.body.obj.internalNote3) {
      dataObj.item_data.internal_note_3 = req.body.obj.internalNote3;
    }
    if (req.body.obj.replacementCost) {
      dataObj.item_data.replacement_cost = req.body.obj.replacementCost;
    }
    if (req.body.obj.provenance) {
      dataObj.item_data.provenance = req.body.obj.provenance;
    }
    if (req.body.obj.condition) {
      dataObj.item_data.condition = req.body.obj.condition;
    }
    console.log("updated dataObj -------- ", dataObj);
    res.status(200);
  } catch (error) {
    console.log("updateItemErrorAPI Error:   ", error.message);
    res.send(error);
  }
});

// Route to retreive 538a field data.
router.put("/538Text", async function (req, res) {
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

    //pulling out the XML hodings data and searching to see if 'committed to retain' is in the text. If the text is found returning the text to the front end to show.
    let string583a = "";
    let document = data.anies[0];
    document = document.toString();
    //console.log("document", document);
    let xmlParsedDoc = await new dom().parseFromString(document);
    string583a = xpath.select("//datafield[@tag=583]/subfield", xmlParsedDoc);
    //console.log("string583a----------   ", string583a);
    if (string583a.length === 0) {
      string583a = "----";
    } else {
      string583a = string583a[0].toString();
      string583a = string583a.replace(/<subfield(.*?)>/g, "");
      string583a = string583a.replace(/<\/subfield>/g, "");
    }

    res.send(string583a);
  } catch (error) {
    console.log("updateItemErrorAPI Error:   ", error.message);
    res.send(error);
  }
});

// route to do the checking of order of call numbers for order of books on the shelves.
router.put("/callNumCheck", async function (req, res) {
  try {
    const dataObj = req.body;

    console.log("dataObj from callNumbCheck ---------", dataObj);
    //let firstCal cd  Does not work, Needs to be sent and changed on the front end.
    const x = req.body.x;
    const y = req.body.y;
    console.log("x & y from callNumbCheck ---------", x, y);

    let result = await lc.lte(x, y); /* true */

    console.log("result +++++++++++++++++", result);

    res.json({ status: result });
  } catch (error) {
    console.log("updateItemErrorAPI Error:   ", error.message);
    res.send(error);
  }
});

// Route to do autoupdate of Inventory Date and Check Replacement Cost
router.put("/", async function (req, res) {
  try {
    //console.log("Inventory main put route - req.body ++++++ )", req.body.respDataObj);
    const dataObj = req.body.respDataObj.dataObjTotal;
    //console.log("dataObj item-data", dataObj.item_data);

    let cost = dataObj.item_data.replacement_cost;
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
    //console.log("data --------------------- ", data);
    res.json(data);
  } catch (error) {
    console.log("updateItemErrorAPI Error:   ", error.message);
    res.send(error);
  }
});

// generic get route to test avaialablity
router.get("/", function (req, res) {
  //console.log("req.body.barcode)",req.body.barcode)
  res.status(200).send("Inventory home page");
});

module.exports = router;
