import React, { Component } from "react";
import { connect } from "react-redux";

class DataFormContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <h5>This is the DataForm page.</h5>
        <p>DataFormContainer</p>
        <p>{this.props.inventory}</p>
        <p>#1 {this.props.barcode}</p>
        <p>#2 {this.props.barcode2}</p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inventory: state.inventory.inventory,
    barcode: state.inventory.barcode,
    barcode2: state.inventory.barcode2,
    title: state.inventory.title,
  };
};

export default connect(mapStateToProps, null)(DataFormContainer);
