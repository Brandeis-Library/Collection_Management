import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReceiveBarcode from './ReceiveBarcode'



class InventoryContainer extends Component {

   
    render () {
        return (
            <React.Fragment>
                {/* <h1>This is the Inventory page.</h1> */}
                <ReceiveBarcode />
                <p>
                    InventoryContainer 
                </p>
                <p>{this.props.inventory}</p>
                <p>{this.props.barcode}</p>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        inventory: state.inventory.inventory,
        barcode: state.inventory.barcode
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         : => dispatch(())
//     }
// }


export default connect(mapStateToProps, null)(InventoryContainer)
