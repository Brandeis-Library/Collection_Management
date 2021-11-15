import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import {increment, decrement } from '../redux/actions'

 class IronMountainContainer extends Component {

    render () {
        //const {increment, decrement, inventory} = this.props
        return (
        <React.Fragment>
            <h1>This is the Iron Mountain page.</h1>
            <p>
                {this.props.inventory}<br/>{this.props.barcode}
                </p>
                <div>
                <Button onClick = {this.props.increment} className={"btn-min btn-success"} size="sm" type="submit" value="Submit" >Increment by 1</Button>
                </div>
                <br/>
                <div>
                <Button onClick = {this.props.decrement} className={"btn-min btn-danger"} size="sm" type="submit" value="Submit" >Decrement by 1</Button>
                </div>

        </React.Fragment>)
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        inventory: state.inventory.inventory,
        barcode: state.inventory.barcode
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {
          increment: () => dispatch(increment()),
          decrement: () => dispatch(decrement()),
      }
  
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(IronMountainContainer)
