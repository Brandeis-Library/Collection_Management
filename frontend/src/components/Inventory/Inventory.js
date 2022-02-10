import React, { Component } from "react";
import { connect } from "react-redux";
import ReceiveBarcode from "./ReceiveBarcode";
import TilesHolder from "./TilesHolder";
import Header from "./LoadingBar";

class InventoryContainer extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <h1>This is the Inventory page.</h1> */}
        {/* <Header /> */}
        <ReceiveBarcode />
        <TilesHolder />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //inventory: state.inventory.inventory,
    barcode: state.inventory.barcode,
    barcode2: state.inventory.barcode2,
  };
};

export default connect(mapStateToProps, null)(InventoryContainer);
