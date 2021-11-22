
const itemRecordObj = {
    barcode: '',
    title: '',
    mms_id: '',
    holdingID: '',
    itemID: '',
    status: '',
    callNum: '',
    permLib: '',
    permLoc: '',
    tempLib: '',
    tempLoc: '',
    string583a: '',
    inventoryDate: '',
    internalNote3: '',
    dataObj: {},
    link: '',
  };

  const retrieveDataItems = (data) => {
    itemRecordObj.link = data.link;

    return itemRecordObj;
  }

  module.exports = retrieveDataItems