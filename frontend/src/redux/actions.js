import {
  INCREMENT,
  DECREMENT,
  BARCODE,
  SENDBARCODE,
  UPDATEITEM,
  UPDATEITEMFORM,
  FIND538A,
  UPDATEMESSAGE,
} from "./actionTypes";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function increment() {
  return {
    type: INCREMENT,
  };
}
export function decrement() {
  return {
    type: DECREMENT,
  };
}

export function barcode(text) {
  return {
    type: BARCODE,
    payload: { text: text },
  };
}

export function updateMessage(obj) {
  return {
    type: UPDATEMESSAGE,
    payload: obj,
  };
}

export function sendBarcodeToBackend(barcode) {
  return async function fetchItemDetailThunk(dispatch, getState) {
    try {
      dispatch(showLoading());
      console.log("barcode in actions.js ---------", barcode);
      const response = await axios.post("http://localhost:4000/api/v1/inventory/", { barcode });
      const respDataObj = response.data.dataObj;
      console.log("fetchItemDetailThunk-------", respDataObj.data);
      dispatch(sendBarCode(respDataObj));
      const responseWithUpdate = await axios.put("http://localhost:4000/api/v1/inventory/", {
        respDataObj,
      });
      dispatch(updateItem(responseWithUpdate.data));
      dispatch(actionField(responseWithUpdate.data));
      dispatch(hideLoading());
    } catch (error) {
      console.error("Invalid barcode number.", error.message);
      console.log(error);
      const callNum = localStorage.getItem("CallNumforTest");
      const obj = {};
      obj.status = false;
      obj.message = "Possible barcode error. Please retry. " + error.message;
      obj.localStorageCallNum = callNum;
      dispatch(updateMessage({ obj }));
    }
  };
}

export function sendBarCode(dataObj) {
  return {
    type: SENDBARCODE,
    payload: {
      barcode2: dataObj.barcode,
      title: dataObj.title,
      status: dataObj.status,
      callNum: dataObj.callNum,
      permLib: dataObj.permLib,
      dataObjTotal: dataObj.dataObjTotal,
      mms_id: dataObj.mms_id,
      holdingID: dataObj.holdingID,
      itemID: dataObj.itemID,
      permLoc: dataObj.permLoc,
      tempLib: dataObj.tempLib,
      tempLoc: dataObj.tempLoc,
      string583a: "",
      inventoryDate: dataObj.inventoryDate,
      internalNote3: dataObj.internalNote3,
      link: dataObj.link,
      replacementCost: dataObj.replacementCost,
      provenance: dataObj.provenance,
      condition: dataObj.condition,
    },
  };
}

export function updateItem(dataObj) {
  return {
    type: UPDATEITEM,
    payload: {
      dataObjTotal: dataObj,
      inventoryDate: dataObj.item_data.inventory_date,
      replacementCost: dataObj.item_data.replacement_cost,
    },
  };
}

export function updateItemFormQuery(obj) {
  return async function updateItemThunk(dispatch, getState) {
    try {
      const { data } = await axios.put("http://localhost:4000/api/v1/inventory/itemform", {
        obj,
      });
      console.log("responseWithUpdate ", data);
      //console.log("responseWithUpdate physical_condition -----", data);
      dispatch(updateItemFormData(data));
    } catch (error) {
      console.error("Error submitting form data. ", error.message);
      console.log(error);
      const callNum = localStorage.getItem("CallNumforTest");
      const obj = {};
      obj.status = false;
      obj.message = "Error submitting form data. " + error.message;
      obj.localStorageCallNum = callNum;
      dispatch(updateMessage({ obj }));
    }
  };
}

export function updateItemFormData(dataObj) {
  return {
    type: UPDATEITEMFORM,
    payload: {
      dataObjTotal: dataObj,
      internalNote3: dataObj.item_data.internal_note_3,
      replacementCost: dataObj.item_data.replacement_cost,
      provenance: dataObj.item_data.provenance.value,
      condition: dataObj.item_data.physical_condition.value,
    },
  };
}

export function actionField(obj) {
  return async function find538aThunk(dispatch, getState) {
    try {
      const text = await axios.put("http://localhost:4000/api/v1/inventory/538Text", {
        obj,
      });
      console.log("538a Text ************  ", text);
      dispatch(updateaActionText(text));
    } catch (error) {
      console.error("Unable to retrieve 538a field data. ", error.message);
      console.log(error);
      const callNum = localStorage.getItem("CallNumforTest");
      const obj = {};
      obj.status = false;
      obj.message = "Unable to retrieve 538a field data. " + error.message;
      obj.localStorageCallNum = callNum;
      dispatch(updateMessage({ obj }));
    }
  };
}

export function updateaActionText(text) {
  return {
    type: FIND538A,
    payload: {
      string583a: text,
    },
  };
}
