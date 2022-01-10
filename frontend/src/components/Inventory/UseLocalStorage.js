import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMessage } from "../../redux/actions";
import { Button } from "react-bootstrap";

class UseLocalStorageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { firstCallNum: "" };
  }

  handleChange = (event) => {
    this.setState({ firstCallNum: event.target.value });
  };

  handleClear = (event) => {
    event.preventDefault();
    localStorage.removeItem("CallNumforTest");
    const obj = {
      status: this.props.status,
      message: this.props.message,
      localStorageCallNum: "",
    };
    this.props.updateMessage({ obj });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.firstCallNum) {
      localStorage.setItem("CallNumforTest", this.state.firstCallNum);
      const obj = {
        status: this.props.status,
        message: this.props.message,
        localStorageCallNum: this.state.firstCallNum,
      };
      this.props.updateMessage({ obj });
      this.setState({ firstCallNum: "" });
    } else {
      alert("Please enter a LC Call Number.");
    }
  };

  render() {
    console.log("firstCallNum", this.state.firstCallNum);
    return (
      <div>
        <h5> Current Call #: {this.props.callNum} </h5>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter First Call #:{" "}
            <input
              type="text"
              name="firstCallNum"
              value={this.state.firstCallNum}
              onChange={this.handleChange}
              placeholder="ex: DC611.B848 ‡b H84 1997"
            />
          </label>{" "}
          <br />
          <br />
          <Button className="btn btn-success" type="submit" value="Submit">
            Enter Call #{" "}
          </Button>{" "}
          <Button className="btn btn-warning" type="clear" value="Clear" onClick={this.handleClear}>
            Clear Call #{" "}
          </Button>
        </form>
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.inventory.message.message,
    status: state.inventory.message.status,
    callNum: state.inventory.message.localStorageCallNum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessage: (obj) => dispatch(updateMessage(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UseLocalStorageContainer);
