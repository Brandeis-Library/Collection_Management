import {
  INCREMENT,
  DECREMENT,
  BARCODE,
  SENDBARCODE,
  UPDATEITEM,
  FIND538A,
  UPDATEMESSAGE,
  UPDATEITEMFORM,
} from "./actionTypes.js";

const initialState = {
  inventory: 4,
  barcode: "",
  barcode2: "",
  title: "",
  dataObjTotal: { item_data: { replacement_cost: 0, internal_note_3: "" } },
  mms_id: "",
  holdingID: "",
  itemID: "",
  status: "",
  callNum: "",
  permLib: "",
  permLoc: "",
  tempLib: "",
  tempLoc: "",
  string583a: "",
  inventoryDate: "",
  internalNote3: "",
  link: "",
  replacementCost: "",
  provenance: "",
  condition: "",
  message: { status: "empty", message: "none", localStorageCallNum: "ZZ 9999 .Z99 2022" },
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, inventory: state.inventory + 1 };
    case DECREMENT:
      return { ...state, inventory: state.inventory - 1 };
    case BARCODE:
      return { ...state, barcode: action.payload.text.text };
    case FIND538A:
      return { ...state, string583a: action.payload.string583a.data };
    case SENDBARCODE:
      return {
        ...state,
        barcode2: action.payload.barcode2,
        title: action.payload.title,
        dataObjTotal: action.payload.dataObjTotal,
        mms_id: action.payload.mms_id,
        holdingID: action.payload.holdingID,
        itemID: action.payload.itemID,
        status: action.payload.status,
        callNum: action.payload.callNum,
        permLib: action.payload.permLib,
        permLoc: action.payload.permLoc,
        tempLib: action.payload.tempLib,
        tempLoc: action.payload.tempLoc,
        string583a: "",
        inventoryDate: action.payload.inventoryDate,
        internalNote3: action.payload.internalNote3,
        link: action.payload.link,
        replacementCost: action.payload.replacementCost,
        provenance: action.payload.provenance,
        condition: action.payload.condition,
      };
    case UPDATEITEM:
      return {
        ...state,
        dataObjTotal: action.payload.dataObjTotal,
        inventoryDate: action.payload.inventoryDate,
        replacementCost: action.payload.replacementCost,
      };
    case UPDATEITEMFORM:
      return {
        ...state,
        dataObjTotal: action.payload.dataObjTotal,
        internalNote3: action.payload.internalNote3,
        replacementCost: action.payload.replacementCost,
      };
    case UPDATEMESSAGE:
      return { ...state, message: { ...action.payload.obj } };
    default:
      return state;
  }
};
