import React, { Component } from 'react';
import DataDisplay from './DataDisplay';
import DataForm from './DataForm';

export default class TilesHolder extends Component {

    render () {
        return <React.Fragment><DataDisplay/><DataForm/></React.Fragment>
    }

}
