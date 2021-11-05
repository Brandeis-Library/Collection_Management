import React, { Component } from 'react';
import { connect } from 'react-redux'
import {INCREMENT, DECREMENT  } from '../redux/actions'

 class IronMountainContainer extends Component {

    render () {
        return <React.Fragment><h1>This is the Iron Mountain page.</h1><p>{this.props.inventory}</p><div>
        <button onClick = {INCREMENT}>INCREMENT BY 1</button>
     </div>
     <div>
        <button onClick = {DECREMENT}>DECREMENT BY 1</button>
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
          INCREMENT: () => dispatch(INCREMENT),
          DECREMENT: () => dispatch(DECREMENT),
      }
  
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(IronMountainContainer)
