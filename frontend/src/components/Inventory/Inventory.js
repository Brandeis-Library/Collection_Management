import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReceiveBarcode from './ReceiveBarcode'
import TilesHolder from './TilesHolder';



class InventoryContainer extends Component {

   
    render () {
        return (
            <React.Fragment>
                {/* <h1>This is the Inventory page.</h1> */}
                <ReceiveBarcode />
                <p>InventoryContainer</p>
                <p>{this.props.inventory}</p>
                <p>#1 {' '}{this.props.barcode}</p>
                <p>#2 {' '}{this.props.barcode2}</p>
                <TilesHolder/>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        inventory: state.inventory.inventory,
        barcode: state.inventory.barcode,
        barcode2: state.inventory.barcode2,
    }
}


export default connect(mapStateToProps, null)(InventoryContainer)
