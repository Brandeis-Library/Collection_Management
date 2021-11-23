
import React, { Component } from 'react';
import { Link} from "react-router-dom";

export default  class Navbar extends Component {

    render () {
      const linkStyle = {
        marginLeft: "1rem",
        textDecoration: "none",
        color: 'blue',
        fontWeight: 'bold',

      };

      const headerStyle = {
     
        paddingRight: '50px',
        // paddingTop: '5px',

        textAlign: 'right',
        color: 'blue',
        fontSize: '30px',
      }
      // testing to see if prettier is working.
    return (
      <React.Fragment>
        <div style={{textAlign: "left"}}> 
        <img src="Library_logo_blue_DIGITAL.png" alt="Brandeis Logo" height="75px" />
        </div>
        <div style={headerStyle}>   <div>Collection Management App</ div></div>
   
      <div style={{
        display: 'flex',
        textAlign: 'left',
        justifyContent: 'left',
        height: '45px',
        paddingLeft: '10px',
        borderBottom: '3px solid rgba(0, 0, 128)',
        
      }}>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/Inventory">Inventory</Link>
        <Link style={linkStyle} to="/Mapping">Mapping</Link>
        <Link style={linkStyle} to="/admin">Admin</Link>
        <Link style={linkStyle} to="/BulkCheckin">Bulk Checkin</Link>
        <Link style={linkStyle} to="/IronMountain">Iron Mountain</Link>
      </div>
      </React.Fragment>
    );
    }
  };