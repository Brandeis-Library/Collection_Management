import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMessage } from "../../redux/actions";
import { Button } from "react-bootstrap";

// componet to manage the call number # to be used for the sorting algorithm.
class UseLocalStorageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { firstCallNum: "" };
  }

  // processes data that is typed into Call # text box into local state
  handleChange = (event) => {
    this.setState({ firstCallNum: event.target.value });
  };

  // clears curent call number in local storage
  handleClear = (event) => {
    event.preventDefault();
    localStorage.removeItem("CallNumforTest");
    const obj = {
      status: "None",
      message: "",
      localStorageCallNum: "",
    };
    this.props.updateMessage({ obj });
  };

  //
  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.firstCallNum) {
      localStorage.setItem("CallNumforTest", this.state.firstCallNum);
      const obj = {
        status: "None",
        message: "",
        localStorageCallNum: this.state.firstCallNum,
      };
      this.props.updateMessage({ obj });
      this.setState({ firstCallNum: "" });
    } else {
      const obj = {
        status: false,
        message: "Please enter a LC Call Number.",
        localStorageCallNum: localStorage.getItem("CallNumforTest"),
      };
      this.props.updateMessage({ obj });
    }
  };

  render() {
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
