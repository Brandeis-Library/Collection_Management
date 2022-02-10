import React, { Component } from "react";
import LoadingBar from "react-redux-loading-bar";

class Header extends Component {
  render() {
    return (
      <header>
        <LoadingBar style={{ backgroundColor: "blue", height: "5px" }} />
      </header>
    );
  }
}

export default Header;
