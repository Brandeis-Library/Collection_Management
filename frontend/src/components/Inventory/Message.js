import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMessage } from "../../redux/actions";
import axios from "axios";
class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentDidMount() {
    const obj = {
      status: this.props.status,
      message: this.props.message,
      localStorageCallNum: localStorage.getItem("CallNumforTest"),
    };
    this.props.updateMessage({ obj });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.callNum !== prevProps.callNum) {
      console.log("inside messagecontainer component did update method.");
      const obj = {};
      const x = await localStorage.getItem("CallNumforTest");
      const y = this.props.callNum;
      const response = await axios.put("http://localhost:4000/api/v1/inventory/callNumCheck", {
        x,
        y,
      });
      console.log("RESpONSE++++++++++++++++++++", response);
      const result = response.data.status;
      console.log("result ---------", result);
      if (result) {
        obj.message = "Item is in the proper order!";
        localStorage.setItem("CallNumforTest", y);
        obj.localStorageCallNum = this.props.callNum;
      } else {
        obj.message = "Item is out of order!!! Please reshelve in the proper place!";
        //obj.localStorageCallNum = this.props.callNum;
      }
      obj.status = result;
      console.log("obj from componentDidUpdate from Message.js +++++++++++++", obj);
      this.props.updateMessage({ obj });
    }
  }

  render() {
    return (
      <React.Fragment>
        Message: {this.props.message} Status:{String(this.props.status)} Call Num:
        {this.props.callNum}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.inventory.message.message,
    status: state.inventory.message.status,
    //   barcode2: state.inventory.barcode2,
    //   title: state.inventory.title,
    //   // dataObjTotal: state.inventory.dataObjTotal,
    //   mms_id: state.inventory.mms_id,
    //   holdingID: state.inventory.holdingID,
    //   itemID: state.inventory.itemID,
    //   status: state.inventory.status,
    callNum: state.inventory.callNum,
    //   permLib: state.inventory.permLib,
    //   permLoc: state.inventory.permLoc,
    //   tempLib: state.inventory.tempLib,
    //   tempLoc: state.inventory.tempLoc,
    //   string583a: state.inventory.string583a,
    //   inventoryDate: state.inventory.inventoryDate,
    //   internalNote3: state.inventory.internalNote3,
    //   link: state.inventory.link,
    //   replacementCost: state.inventory.replacementCost,
    //   provenance: state.inventory.provenance.desc,
    //   condition: state.inventory.condition.desc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessage: (obj) => dispatch(updateMessage(obj)),
    //sendBarcodeToBackend: (text) => dispatch(sendBarcodeToBackend(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
