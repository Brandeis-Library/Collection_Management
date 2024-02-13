import {
  INCREMENT,
  DECREMENT,
  BARCODE,
  SENDBARCODE,
  UPDATEITEM,
  UPDATEITEMFORM,
  FIND538A,
  UPDATEMESSAGE,
  LOGIN
} from "./actionTypes";
import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";

// Increases inventory.inventory by the amount of increment. Usually 1.
// Used as the inital testing of this redux install
// May be removed in the future
export function increment() {
  return {
    type: INCREMENT,
  };
}

// Decreases inventory.inventory by the amount of decrement. Usually 1.
// Used as the inital testing of this redux install
// May be removed in the future
export function decrement() {
  return {
    type: DECREMENT,
  };
}

// Used to process the barcode in receive barcode
export function barcode(text) {
  return {
    type: BARCODE,
    payload: { text: text },
  };
}
// Used to update the message state whether for items in order, errors, etc.
export function updateMessage(obj) {
  return {
    type: UPDATEMESSAGE,
    payload: obj,
  };
}
// Thunk that sends the barcode to the backend to retrieve the specific item record.
// On item record retrieval, state is upsdated then an update is sent to the backend to for inventory date & replacement cost
// State is updated and then the data for the holdings 538a field are retrieved from the backend
// State is update with 538a field.
// Uses the loading bar to show progress to user.
export function sendBarcodeToBackend(barcode) {
  return async function fetchItemDetailThunk(dispatch, getState) {
    try {
      dispatch(showLoading());
      const response = await axios.post(`${process.env.API_URL}:4000/api/v1/inventory/`, { barcode });
      const respDataObj = response.data.dataObj;
      dispatch(sendBarCode(respDataObj));
      const responseWithUpdate = await axios.put(`${process.env.API_URL}:4000/api/v1/inventory/`, {
        respDataObj,
      });
      dispatch(updateItem(responseWithUpdate.data));
      dispatch(actionField(responseWithUpdate.data));
      dispatch(hideLoading());
    } catch (error) {
      console.error("Possible invalid barcode number.", error.message);
      console.error(error);
      const callNum = localStorage.getItem("CallNumforTest");
      const obj = {};
      obj.status = false;
      obj.message = "Possible barcode error. Please retry. " + error.message;
      obj.localStorageCallNum = callNum;
      dispatch(updateMessage({ obj }));
    }
  };
}

// Take the obj returned from the barcode being sent to the backend and converts it to state.
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

// Updates state for inventory date and replacement cost from updated item in SendBarcodeToBackend thunk.
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
// Thunk for sending data from the inventory update form to the backend for processing in Alma.
// updates state when data obj is successfully returned.
// Uses loading bar to show progress to user
export function updateItemFormQuery(obj) {
  return async function updateItemThunk(dispatch, getState) {
    try {
      dispatch(showLoading());
      const { data } = await axios.put(`${process.env.API_URL}:4000/api/v1/inventory/itemform`, {
        obj,
      });
      dispatch(updateItemFormData(data));
      dispatch(hideLoading());
    } catch (error) {
      console.error("Error submitting form data. ", error.message);
      console.error(error);
      const callNum = localStorage.getItem("CallNumforTest");
      const obj = {};
      obj.status = false;
      obj.message = "Error submitting form data. " + error.message;
      obj.localStorageCallNum = callNum;
      dispatch(updateMessage({ obj }));
    }
  };
}

// Updates state of fields submitted by the inventory update form
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

// Thunk to retrieve 538a holdings text.
export function actionField(obj) {
  return async function find538aThunk(dispatch, getState) {
    try {
      const text = await axios.put(`${process.env.API_URL}/api/v1/inventory/538Text`, {
        obj,
      });
      dispatch(updateaActionText(text));
    } catch (error) {

      const callNum = localStorage.getItem("CallNumforTest");
      const obj = {};
      obj.status = false;
      obj.message = "Unable to retrieve 538a field data. " + error.message;
      obj.localStorageCallNum = callNum;
      dispatch(updateMessage({ obj }));
    }
  };
}


// Thunk for sending username and password to backend for validation.
// State will be updated if account is valid with account information.
// Will also process error messages if the user is not found.
export function validateUser(obj) {
  return async function loginUser(dispatch, getState) {
    try {
      const dataObj = await axios.post(`${process.env.API_URL}:4000/api/v1/users/getOne`, {
        obj,
      });

      if (dataObj.data.length === 0) {
        const error = new Error("noUser");
        error.message = "User not found.";
        error.status = 404;
        throw error;
      }
      dispatch(updateUser(dataObj));
    } catch (error) {
      console.log("Uanble to login user.");
      const obj = {};
      obj.status = false;
      obj.message = "Unable to login user. " + error.message;

      dispatch(updateMessage({ obj }));
    }
  };
}

// Update state with signed in user.

export function updateUser(obj) {
  return {
    type: LOGIN, payload: { user: obj }
  };
}
// Update state after recieving 538a text
export function updateaActionText(text) {
  return {
    type: FIND538A,
    payload: {
      string583a: text,
    },
  };
}