import React, { Component } from "react";
import { connect } from "react-redux";
import { updateItem } from "../../redux/actions";

class DataFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note3: "",
      price: "",
      provenance: "",
      condition: "",
    };
  }

  handleInputChange = (event) => {
    //const target = event.target;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = event.target.name;
    const value = event.target.value;
    //console.log("++++++++++ Target----", event.target, "name", event.target.name, "value", event.target.value);
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.updateItem({
      internalNote3: this.state.note3,
      replacementCost: this.state.price,
      provenance: this.state.provenance,
      condition: this.state.condition,
    });
  };

  render() {
    return (
      <React.Fragment>
        <h5>Update Item Information</h5>
        <br />
        <form>
          <label>
            Note:{" "}
            <input
              name="note3"
              type="text"
              value={this.state.note3}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Price:{" "}
            <input
              name="price"
              type="text"
              value={this.state.price}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Provenance:{" "}
            <select
              name="provenance"
              value={this.state.value}
              onChange={this.handleInputChange}
              type="text">
              <option value="">None</option>
              <option value="JCR">Jewish Cultural Reconstruction</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Condition:{" "}
            <select
              name="condition"
              value={this.state.value}
              onChange={this.handleInputChange}
              type="text">
              <option value="">None</option>
              <option value="BRITTLE">Brittle</option>
              <option value="DAMAGED">Damaged</option>
              <option value="DETERIORATING">Deteriorating</option>
              <option value="FRAGILE">Fragile</option>
            </select>
          </label>
        </form>
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

const mapDispatchToProps = (dispatch) => {
  return {
    // barcode: (text) => dispatch(barcode(text)),
    // sendBarcodeToBackend: (text) => dispatch(sendBarcodeToBackend(text)),
    updateItem: (obj) => {
      dispatch(updateItem(obj));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataFormContainer);
