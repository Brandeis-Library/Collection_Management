import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field } from "react-final-form";
import { Button } from "react-bootstrap";
import { updateItemForm } from "../../redux/actions";

class DataFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note3: this.props.intNote3,
      price: "",
      provenance: "JCR",
      condition: "",
    };
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.updateItemForm({
      dataObj: this.props.dataObj,
      internalNote3: this.state.intNote3,
      replacementCost: this.state.price,
      provenance: this.state.provenance,
      condition: this.state.condition,
    });
  };

  render() {
    const buttonStyle = {
      borderRadius: "5px",
      paddingTop: "7px",
      paddingBottom: "7px",
      marginBottom: "5px",
      fontSize: "15px",
    };

    console.log("this.props for DataForm +++++++++++++ ", this.props);
    return (
      <React.Fragment>
        <h5>Update Item Information</h5>
        <br />

        <Form
          onSubmit={this.handleFormSubmit}
          initialValues={{ price: this.props.price }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={this.handleFormSubmit}>
              <label>
                Note:{" "}
                <input
                  name="note3"
                  type="text"
                  value={this.props.note3}
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
                  <option value="-">None</option>
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
                  <option value="-">None</option>
                  <option value="BRITTLE">Brittle</option>
                  <option value="DAMAGED">Damaged</option>
                  <option value="DETERIORATING">Deteriorating</option>
                  <option value="FRAGILE">Fragile</option>
                </select>
              </label>
              <br />
              <br />
              <Button
                className={"btn-min btn-primary"}
                size="sm"
                type="submit"
                value="Submit"
                style={buttonStyle}>
                Submit Form Data
              </Button>
            </form>
          )}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    intNote3: state.inventory.internalNote3,
    condition: state.inventory.condition,
    provenance: state.inventory.provenance,
    price: state.inventory.price,
    dataObj: state.inventory.dataObjTotal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateItemForm: (obj) => {
      dispatch(updateItemForm(obj));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataFormContainer);
