import React, { Component } from 'react';
import { connect } from 'react-redux'
import {increment, decrement } from '../redux/actions'

 class IronMountainContainer extends Component {

    render () {
        //const {increment, decrement, inventory} = this.props
        return <React.Fragment><h1>This is the Iron Mountain page.</h1><p>{this.props.inventory}</p><div>
        <button onClick = {this.props.increment}>Increment by 1</button>
     </div>
     <div>
        <button onClick = {this.props.decrement}>Decrement by 1</button>
     </div></React.Fragment>
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        inventory: state.inventory.inventory
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
      return {
          increment: () => dispatch(increment()),
          decrement: () => dispatch(decrement()),
      }
  
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(IronMountainContainer)
