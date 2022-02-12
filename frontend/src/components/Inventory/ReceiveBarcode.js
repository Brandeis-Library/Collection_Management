import React, { Component } from "react";
import { connect } from "react-redux";
import MessageContainer from "./Message";
import { Button } from "react-bootstrap";
import { barcode, sendBarcodeToBackend, updateMessage } from "../../redux/actions";

// The component the receives the barcode from the end user and sends it to the backend
// so the item obj can be retrieved.
class ReceiveBarcodeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barcode: "",
    };
  }

  // updates state as the barcode is entered into the text field.
  handleChange = (event) => {
    const barcodeIntermediate = String(event.target.value);
    this.setState({ barcode: barcodeIntermediate });
  };

  // does checks to see if the barcode is properly formatted.
  // if yes, it is sent to the backend
  // if not, a message is sent to the message.js component to be shown to the user.
  handleSubmit = (event) => {
    event.preventDefault();
    try {
      const prevCallNum = localStorage.getItem("prevCallNum");

      if (this.state.barcode === prevCallNum) {
        const obj = {
          status: false,
          message:
            "Barcode is the same as the previous barcode. Please submit a different barcode.",
          localStorageCallNum: localStorage.getItem("CallNumforTest"),
        };
        this.props.updateMessage({ obj });
      } else if (isNaN(this.state.barcode)) {
        const obj = {
          status: false,
          message: "Please enter a properly formatted barcode.",
          localStorageCallNum: localStorage.getItem("CallNumforTest"),
        };
        this.props.updateMessage({ obj });
      } else {
        if (
          this.state.barcode &&
          this.state.barcode.length <= 14 &&
          this.state.barcode.length >= 13
        ) {
          this.props.barcode({ text: this.state.barcode });
          this.props.sendBarcodeToBackend({ text: this.state.barcode });
          localStorage.setItem("prevCallNum", this.state.barcode);
          this.setState({ barcode: "" });
        } else {
          const obj = {
            status: false,
            message: "Please enter a properly formatted barcode.",
            localStorageCallNum: localStorage.getItem("CallNumforTest"),
          };
          this.props.updateMessage({ obj });
        }
      }
    } catch (error) {
      console.error("error in handleSubmit in ReceiveBarcode.js", error);
      const obj = {
        status: false,
        message: error.message,
        localStorageCallNum: localStorage.getItem("CallNumforTest"),
      };
      this.props.updateMessage({ obj });
    }
  };

  render() {
    const labelStyle = {
      paddingRight: "10px",
      paddingTop: "25px",
      paddingBottom: "20px",
      fontSize: "20px",
    };

    const buttonStyle = {
      borderRadius: "5px",
      paddingTop: "7px",
      paddingBottom: "7px",
      marginBottom: "5px",
      fontSize: "15px",
    };

    return (
      <div>
        <MessageContainer />
        <form onSubmit={this.handleSubmit}>
          <label style={labelStyle}>
            Barcode:{" "}
            <input
              type="text"
              autoFocus
              value={this.state.barcode}
              onChange={this.handleChange}
              name="barcode"
              placeholder="ex: 39097009544900"
            />
          </label>
          <Button
            className={"btn-min btn-primary"}
            size="sm"
            type="submit"
            value="Submit"
            style={buttonStyle}>
            Submit Barcode
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    barcode: state.inventory.barcode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    barcode: (text) => dispatch(barcode(text)),
    sendBarcodeToBackend: (text) => dispatch(sendBarcodeToBackend(text)),
    updateMessage: (obj) => dispatch(updateMessage(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveBarcodeContainer);
