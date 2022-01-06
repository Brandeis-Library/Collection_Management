import React, { Component } from "react";

export default class UseSLocaltorage extends Component {
  constructor(props) {
    super(props);
    this.state = { firstCallNum: "" };
  }

  handleChange = (event) => {
    this.setState({ firstCallNum: event.target.value });
  };

  render() {
    console.log("firstCallNum", this.state.firstCallNum);
    return (
      <div>
        <React.Fragment>UseLocalStorage Component</React.Fragment> <br />
        <form>
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
