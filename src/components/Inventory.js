import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReceiveBarcode from './ReceiveBarcode'
import {barcode} from '../redux/actions'


class InventoryContainer extends Component {

    // addInventory = event => {
    //     event.preventDefault()
    //     console.log(this.state.inventory)
   

    // }


    render () {
        return (
            <React.Fragment>
                {/* <h1>This is the Inventory page.</h1> */}
                <ReceiveBarcode />
                <p>
                    {this.props.inventory}
                </p>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        inventory: state.inventory.inventory
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         addInventory: inventory => dispatch(addInventory(inventory))
//     }
// }


export default connect(mapStateToProps, null)(InventoryContainer)
