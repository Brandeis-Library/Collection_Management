import React, { Component } from 'react';

export default class Home extends Component {

    render() {
        return (
            <div>
                <h1>This is the Home page.</h1>
                <div>Welcome, {this.props.user.username}---{this.props.user.role}</div>
            </div>
        );
    }

}

