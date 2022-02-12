import React, { Component } from "react";
import { connect } from "react-redux";
import ReceiveBarcode from "./ReceiveBarcode";
import TilesHolder from "./TilesHolder";

// The top level container for the Inventory Section of the application.
class InventoryContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <ReceiveBarcode />
        <TilesHolder />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    barcode: state.inventory.barcode,
    barcode2: state.inventory.barcode2,
  };
};

export default connect(mapStateToProps, null)(InventoryContainer);
