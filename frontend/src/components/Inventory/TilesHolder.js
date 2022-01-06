import React, { Component } from "react";
import DataDisplay from "./DataDisplay";
import DataForm from "./DataForm";
import UseSLocaltorage from "./UseLocalStorage";

export default class TilesHolder extends Component {
  render() {
    const floatContainer = {
      padding: "20px",
    };

    const floatChild = {
      width: "48%",
      float: "left",
      padding: "20px",
      margin: "10px",
      border: "3px solid blue",
      borderRadius: "15px",
    };

    return (
      <div style={floatContainer}>
        <div style={floatChild}>
          <DataDisplay />
        </div>
        <div style={floatChild}>
          <DataForm />
        </div>
        <br />
        <div>
          <UseSLocaltorage />
        </div>
      </div>
    );
  }
}
