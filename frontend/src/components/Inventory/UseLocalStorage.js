import React, { Component } from "react";

export default class UseSLocaltorage extends Component {
  constructor(props) {
    super(props);
    this.state = { firstCallNum: "" };
  }

  handleChange = (event) => {
    this.setState({ firstCallNum: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.firstCallNum) {
      //this.props.firstCallNum({ text: this.state.barcode });
      this.setState({ firstCallNum: "" });
    } else {
      alert("Please enter a LC Call Number.");
    }
  };

  render() {
    console.log("firstCallNum", this.state.firstCallNum);
    return (
      <div>
        <React.Fragment>UseLocalStorage Component</React.Fragment> <br />
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
        Enter call number local state: {this.state.firstCallNum}
      </div>
    );
  }
}
