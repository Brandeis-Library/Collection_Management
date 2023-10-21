import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageContainer from "./Inventory//Message";
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { validateUser as login, updateMessage } from '../redux/actions';


class AuthForm extends Component {

    state = {
        username: '',
        password: '',
        buttonClicked: false,
    };

    updateUsername = (event) => {
        this.setState({ username: event.target.value });
    };

    updatePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    // signup = () => {

    //     const { username, password } = this.state;
    //     this.setState({ buttonClicked: true });
    //     this.props.signup({ username, password });
    // };

    login = (event) => {
        event.preventDefault();
        try {
            const { username, password } = this.state;
            if (!password || !username) {
                const obj = {
                    status: false, message: "username and password must be entered."
                };
                this.props.updateMessage({ obj });
            }
            //const { username, password } = this.state;
            else {
                this.setState({ buttonClicked: true });
                this.props.login({ username, password });
            }
        } catch (error) {
            console.error("error in login in AuthFormjs", error);
            const obj = {
                status: false,
                message: error.message,
                localStorageCallNum: localStorage.getItem("CallNumforTest"),
            };
            this.props.updateMessage({ obj });
        }

    };

    // get Error() {

    //     if (this.props.account && this.state.buttonClicked && this.props.account.status === fetchStates.error) {
    //         return <div className="errorTextColor" >{this.props.account.message}</div>;
    //     }
    // }

    render() {

        return (

            <div>
                <h2> Sign In to use the application.</h2>
                <MessageContainer />
                <form>
                    <FormGroup>
                        <FormControl
                            type="text"
                            value={this.state.username}
                            placeholder="username..."
                            onChange={this.updateUsername}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            placeholder="password..."
                            onChange={this.updatePassword}
                        />
                    </FormGroup>

                    <div>
                        <Button variant="success" onClick={this.login}>Sign In</Button>
                        {/* <span> or </span>
                        <Button variant="primary" onClick={this.signup}>Sign Up</Button> */}
                    </div>

                </form>

            </div>
        );
    }
};

const mapStateToProps = (state) => {

    const account = state.account;
    return {
        account
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //signup: ({ username, password }) => dispatch(signup({ username, password })),
        login: ({ username, password }) => dispatch(login({ username, password })),
        updateMessage: (obj) => dispatch(updateMessage(obj)),
    };
};

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(AuthForm);