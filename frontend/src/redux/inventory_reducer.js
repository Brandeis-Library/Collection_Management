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
  dataObjTotal: {
    item_data: {
      replacement_cost: 0,
      internal_note_3: "",
      provenance: { value: "" },
      physical_condition: { value: "" },
    },
  },
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
    // Fot inital testing of reduux. May be removed in the future.
    case INCREMENT:
      return { ...state, inventory: state.inventory + 1 };
    // Fot inital testing of reduux. May be removed in the future.
    case DECREMENT:
      return { ...state, inventory: state.inventory - 1 };
    // initial barcodde reciept from recieve barcode component
    case BARCODE:
      return { ...state, barcode: action.payload.text.text };
    // modifies the 538a state
    case FIND538A:
      return { ...state, string583a: action.payload.string583a.data };
    // processes the initially recieved item data obj info into state used in data display component
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
        provenance: action.payload.provenance.value,
        condition: action.payload.condition.value,
      };
    // processes the auto update of inventory date and replacement cost from the backend into state
    case UPDATEITEM:
      return {
        ...state,
        dataObjTotal: action.payload.dataObjTotal,
        inventoryDate: action.payload.inventoryDate,
        replacementCost: action.payload.replacementCost,
      };
    // adds data from updated fields in inventory form to state after they are updated in Alma
    case UPDATEITEMFORM:
      return {
        ...state,
        dataObjTotal: action.payload.dataObjTotal,
        internalNote3: action.payload.internalNote3,
        replacementCost: action.payload.replacementCost,
        provenance: action.payload.provenance,
        condition: action.payload.condition,
      };
    // used to update message state used by message component
    case UPDATEMESSAGE:
      return { ...state, message: { ...action.payload.obj } };
    default:
      return state;
  }
};
