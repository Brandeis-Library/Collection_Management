import React, { Component } from 'react';
import { connect } from 'react-redux'

class InventoryContainer extends Component {

    // addInventory = event => {
    //     event.preventDefault()
    //     console.log(this.state.inventory)
   

    // }


    render () {
        return <React.Fragment><h1>This is the Inventory page.{this.props.inventory}</h1></React.Fragment>
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
