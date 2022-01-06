import React, { Component } from "react";

export default class UseSLocaltorage extends Component {
  constructor(props) {
    super(props);
    this.state = { firstCallNum: null };
  }
  render() {
    return (
      <div>
        <React.Fragment>UseLocalStorage Component</React.Fragment> <br />
        <form>
          <label>
            Enter First Call #:
            <input type="text" name="firstCarNum" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
