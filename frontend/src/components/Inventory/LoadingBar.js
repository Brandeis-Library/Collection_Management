import React, { Component } from "react";
import LoadingBar from "react-redux-loading-bar";

// Component for loading/running the loading bar package.
class Header extends Component {
  render() {
    return (
      <header>
        <LoadingBar style={{ backgroundColor: "#0CAFFF", height: "8px" }} />
      </header>
    );
  }
}

export default Header;
