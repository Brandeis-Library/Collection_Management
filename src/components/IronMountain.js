import React, { Component } from 'react';
import { connect } from 'react-redux'

 class IronMountainContainer extends Component {

    render () {
        return <React.Fragment><h1>This is the Iron Mountain page.</h1><p>{this.props.inventory}</p></React.Fragment>
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        inventory: state.inventory.inventory
    }
  }
  
  const mapDispatchToProps = {
    // ... normally is an object full of action creators
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(IronMountainContainer)
