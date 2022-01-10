import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMessage } from "../../redux/actions";

class UseLocalStorageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { firstCallNum: "" };
  }

  handleChange = (event) => {
    this.setState({ firstCallNum: event.target.value });
  };

  // componentDidMount() {
  //   this.setState({ localStorageState: localStorage.getItem("CallNumforTest") });
  // }

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
        {/* <React.Fragment>UseLocalStorage Component</React.Fragment> <br /> */}
        Current LC Call #: {this.props.callNum} <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter First Call #:
            <input
              type="text"
              name="firstCallNum"
              value={this.state.firstCallNum}
              onChange={this.handleChange}
              placeholder="ex: DC611.B848 ‡b H84 1997"
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
        <br />
        {/* Current LC Call # to check against local storage {localStorage.getItem("CallNumforTest")} */}
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
