import React, { Component } from "react";
import { connect } from "react-redux";

class MessageContainer extends Component {
  render() {
    return (
      <div>
        <React.Fragment>
          {this.props.message.message}
          {this.props.message.status}
        </React.Fragment>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.invenory.message,
    //   barcode2: state.inventory.barcode2,
    //   title: state.inventory.title,
    //   // dataObjTotal: state.inventory.dataObjTotal,
    //   mms_id: state.inventory.mms_id,
    //   holdingID: state.inventory.holdingID,
    //   itemID: state.inventory.itemID,
    //   status: state.inventory.status,
    //   callNum: state.inventory.callNum,
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

export default connect(mapStateToProps, null)(MessageContainer);
