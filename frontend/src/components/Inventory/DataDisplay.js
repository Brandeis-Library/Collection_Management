import React, { Component } from "react";
import { connect } from "react-redux";

class DataDisplayContainer extends Component {
  render() {
    const listStyle = {
      textAlign: "left",
    };

    return (
      <React.Fragment>
        <h5>Item Information</h5>
        <div style={listStyle}>
          Barcode: {this.props.barcode2} <br />
          Title: {this.props.title} <br />
          Call #: {this.props.callNum}
          <br />
          Status: {this.props.status}
          <br />
          Condition: {this.props.condition}
          <br />
          Provenance: {this.props.provenance}
          <br />
          Replacement Cost: {this.props.replacementCost}
          <br />
          Inventory Date: {this.props.inventoryDate}
          <br />
          Internal Note 3: {this.props.internalNote3}
          <br />
          Permanent Library: {this.props.permLib}
          <br />
          Permanent Location: {this.props.permLoc}
          <br />
          String 583a: {this.props.string583a}
          <br />
          Temp Lib: {this.props.tempLib}
          <br />
          Temp Loc: {this.props.tempLoc}
          <br />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    barcode2: state.inventory.barcode2,
    title: state.inventory.title,
    // dataObjTotal: state.inventory.dataObjTotal,
    mms_id: state.inventory.mms_id,
    holdingID: state.inventory.holdingID,
    itemID: state.inventory.itemID,
    status: state.inventory.status,
    callNum: state.inventory.callNum,
    permLib: state.inventory.permLib,
    permLoc: state.inventory.permLoc,
    tempLib: state.inventory.tempLib,
    tempLoc: state.inventory.tempLoc,
    string583a: state.inventory.string583a,
    inventoryDate: state.inventory.inventoryDate,
    internalNote3: state.inventory.internalNote3,
    link: state.inventory.link,
    replacementCost: state.inventory.replacementCost,
    provenance: state.inventory.provenance,
    condition: state.inventory.condition.desc,
  };
};

export default connect(mapStateToProps, null)(DataDisplayContainer);
