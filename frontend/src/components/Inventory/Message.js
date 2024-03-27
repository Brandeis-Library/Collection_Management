import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMessage } from "../../redux/actions";
import axios from "axios";
//import { config } from '../../config/config.js';

//console.log("config-----------------Message.js  ", config);

const hostURL = 'http://localhost';

console.log("hostURL---------------Message.js", hostURL);

// Component used for displaying error and items sort order messages in the front end to the user.
class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentDidMount() {
    let locStor = localStorage.getItem("CallNumforTest");
    if (!locStor) {
      localStorage.setItem("CallNumforTest", "ZZ 9999 .Z99 2022");
    }



    const obj = {
      status: this.props.status,
      message: this.props.message,
      localStorageCallNum: localStorage.getItem("CallNumforTest"),
    };
    this.props.updateMessage({ obj });
  }
  // async call to the backend to check if the item is in order or not.
  async componentDidUpdate(prevProps) {
    if (this.props.callNum !== prevProps.callNum) {
      try {
        const obj = {};
        const x = await localStorage.getItem("CallNumforTest");
        const y = this.props.callNum;
        const response = await axios.put(`${hostURL}:4000/api/v1/inventory/callNumCheck`, {
          x,
          y,
        });

        console.log("messages.js backend url.", `${hostURL}:4000/api/v1/inventory/callNumCheck`);

        const result = response.data.status;

        if (result) {
          obj.message = "Item is in the proper order!";
          localStorage.setItem("CallNumforTest", y);
          obj.localStorageCallNum = this.props.callNum;
          obj.status = result;
        } else {
          obj.message = "Item is out of order!!! Please reshelve in the proper place!";
          obj.status = result;
          obj.localStorageCallNum = x;
        }
        obj.status = result;

        this.props.updateMessage({ obj });
      } catch (error) {
        const callNum = localStorage.getItem("CallNumforTest");
        const obj = {};
        obj.status = false;
        obj.message = "Call Number Order Error. " + error.message;
        obj.localStorageCallNum = callNum;
        this.props.updateMessage({ obj });
      }
    }
  }

  render() {
    const goodMessage = {
      color: "white",
      backgroundColor: "green",
      height: "30px",
      padding: "2px",
    };

    const badMessage = {
      color: "white",
      backgroundColor: "red",
      height: "30px",
      padding: "2px",
    };

    return (
      <React.Fragment>
        {(() => {
          if (this.props.message === "none") {
            return <span></span>;
          } else if (this.props.status === true && this.props.message) {
            return <div style={goodMessage}>{this.props.message}</div>;
          } else if (this.props.status === false) {
            return <div style={badMessage}>{this.props.message}</div>;
          }
        })()}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.inventory.message.message,
    status: state.inventory.message.status,
    callNumPrev: state.inventory.message.localStorageCallNum,
    callNum: state.inventory.callNum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessage: (obj) => dispatch(updateMessage(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
