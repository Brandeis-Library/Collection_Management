
const itemRecordObj = {
    dataObjTotal: {},
    barcode: '',
    title: '',
    mms_id: '',
    holdingID: '',
    itemID: '',
    status: '',
    callNum: '',
    permLib:  '',
    permLoc: '',
    tempLib: '',
    tempLoc: '',
    string583a: '',
    inventoryDate: '',
    internalNote3: '',
    link: '',
    replacementCost: '',
    provenance: '',
    condition: '',
  };

  const retrieveDataItems = (data) => {

    itemRecordObj.link = data.link;
     itemRecordObj.title = data.bib_data.title;
     itemRecordObj.mms_id = data.bib_data.mms_id;
     itemRecordObj.holdingID = data.holding_data.holding_id;
     itemRecordObj.itemID = data.item_data.pid;
     itemRecordObj.status = data.item_data.base_status.desc;
     itemRecordObj.callNum = data.holding_data.call_number;
     itemRecordObj.permLib =  data.item_data.library.desc;
     itemRecordObj.permLoc = data.item_data.location.desc;
     itemRecordObj.tempLib =  data.holding_data.temp_library.desc;
     itemRecordObj.tempLoc = data.holding_data.temp_location.desc;
     itemRecordObj.string583a = '';
     itemRecordObj.inventoryDate =  data.item_data.inventory_date || 'None';
     itemRecordObj.internalNote3 = data.item_data.internal_note_3;
     itemRecordObj.dataObjTotal = data;
     itemRecordObj.barcode = data.item_data.barcode;
     itemRecordObj.replacementCost = data.item_data.inventory_price;
     itemRecordObj.provenance = data.item_data.provenance;
     itemRecordObj.condition = data.item-data.physical_condition;

    return itemRecordObj;
  }

  module.exports = retrieveDataItems