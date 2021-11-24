import React, { Component } from 'react';
import { connect } from 'react-redux'

class DataDisplayContainer extends Component {

   
    render () {
        const listStyle = {
            textAlign: 'left',
        }

        return (
            <React.Fragment>
               <h5>Item Information</h5> 
               <div style={listStyle}>
                Barcode: {this.props.barcode2} <br/>
                Title: {this.props.title} <br/>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        barcode2: state.inventory.barcode2,
        title: state.inventory.title,
    }
}


export default connect(mapStateToProps, null)(DataDisplayContainer)