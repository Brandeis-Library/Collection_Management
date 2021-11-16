import React, {Component}from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import {barcode} from '../redux/actions'

class ReceiveBarcodeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

      barcode: '',

    }
  }

  handleChange = (event) => {
    this.setState({ barcode: event.target.value })
    console.log(this.state.barcode)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.barcode.length <= 14 || this.state.barcode.length >= 13) {  
      this.props.barcode({text: this.state.barcode})
      this.setState({ barcode: "" });
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
        <p>
          {this.props.inventory} ReceiveBarcodeContainer
      </p>
        <form onSubmit={this.handleSubmit}>
          <label style={labelStyle}>
            Barcode:{' '}
        <input type="text" autoFocus value={this.state.tempBarcode} onChange={this.handleChange} name="tempBarcode" placeholder="ex: 39097009544900" />
          </label>  
          <Button className={"btn-min btn-primary"} size="sm" type="submit" value="Submit" style={buttonStyle}>Submit Barcode</Button>
        </form>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      inventory: state.inventory.inventory
  }
}

const mapDispatchToProps = dispatch => {
  return {
      barcode: text => dispatch(barcode(text))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReceiveBarcodeContainer)

