import React, {Component}from 'react';
import { Button } from 'react-bootstrap';
//import FindItem from './FindItem';


class ReceiveBarcode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tempBarcode: "",
      barcode: '',

    }
  }

  handleChange = (event) => {
    this.setState({ tempBarcode: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.tempBarcode.length <= 14 || this.state.tempBarcode.length >= 13) {
      this.setState({ barcode: this.state.tempBarcode });
      this.setState({ tempBarcode: "" });
    } else {
      alert("Please enter a properly formatted barcode.")
    }
  }

  render() {

    const labelStyle = {
        paddingRight: "10px",
        paddingTop: "25px",
        paddingBottom: "20px",
        fontSize: "20px",
    }

    const buttonStyle = {
        borderRadius: "5px",
        paddingTop: "7px",
        paddingBottom: "7px",
        marginBottom: "5px",
        fontSize: "15px",
    }

    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <label style={labelStyle}>
            Barcode:{' '}
        <input type="text" autoFocus value={this.state.tempBarcode} onChange={this.handleChange} name="tempBarcode" placeholder="ex: 39097009544900" />
          </label>
          {' '}
          <Button className={"btn-min btn-primary"} size="sm" type="submit" value="Submit" style={buttonStyle}>Submit Barcode</Button>
        </form>
        {/* <FindItem barcode2={this.state.barcode} /> */}
      </div>
    )
  }
}

export default ReceiveBarcode;
