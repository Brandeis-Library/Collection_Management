import React, { Component } from 'react';
import { Link} from "react-router-dom";

export default  class Navbar extends Component {

    render () {
      const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'blue',
        fontWeight: 'bold',
      };

      const headerStyle = {
        position: 'absolute',
        right: '50px',
        paddingTop: '5px',

        textAlign: 'right',
        color: 'blue',
        fontSize: '30px',
      }
      // testing to see if prettier is working.
    return (
      <div style={{
        display: 'flex',
        textAlign: 'left',
        justifyContent: 'left',
        height: '45px',
        paddingLeft: '10px',
        borderBottom: '3px solid rgba(0, 0, 128)',
      }}>
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/inventory">Inventory</Link>
        <Link style={linkStyle} to="/Mapping">Mapping</Link>
        <Link style={linkStyle} to="/admin">Admin</Link>
        <Link style={linkStyle} to="/BulkCheckin">Bulk Checkin</Link>
        <Link style={linkStyle} to="/IronMountain">Iron Mountain</Link>
        <div style={headerStyle} >Brandeis Collection Management App</ div>
      </div>
    );
    }
  };