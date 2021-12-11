const express = require("express");
const router = express.Router();

const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const retrieveDataItems = require("../helperFunctions/retrieveItemData");

// define the home page route

// generic get route to test avaialablity
router.get("/", function (req, res) {
  //console.log("req.body.barcode)",req.body.barcode)
  res.status(200).send("Inventory home page");
});

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
    console.log("inside iventory itemform route -----------------");
    console.log("req.body", req.body);
    console.log("itemform dataObj from the frontend ------------- ", req.body.obj.internalNote3);
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

    res.status(200);
  } catch (error) {
    console.log("updateItemErrorAPI Error:   ", error.message);
    res.send(error);
  }
});

router.put("/", async function (req, res) {
  try {
    //console.log("Inventory main put route - req.body ++++++ )", req.body.respDataObj);
    const dataObj = req.body.respDataObj.dataObjTotal;
    //console.log("dataObj item-data", dataObj.item_data);

    const date = new Date();
    //req.body.resp.dataitem_data.inventory_date = date;
    dataObj.item_data.inventory_date = date;
    //console.log("dataObj", dataObj);
    //console.log(
    //   "update item url",
    //   process.env.EXLIBRIS_API_ROOT +
    //     "/almaws/v1/bibs/" +
    //     dataObj.bib_data.mms_id +
    //     "/holdings/" +
    //     dataObj.holding_data.holding_id +
    //     "/items/" +
    //     dataObj.item_data.pid +
    //     "?apikey=" +
    //     process.env.EXLIBRIS_API_BIB_UPDATE_KEY,
    // );
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
    console.log("data --------------------- ", data);
    res.json(data);
  } catch (error) {
    console.log("updateItemErrorAPI Error:   ", error.message);
    res.send(error);
  }
});

module.exports = router;
