import {Component, useEffect, useState} from "react";
import { connect, useDispatch } from "react-redux";
import {Redirect, useHistory} from "react-router";
import { loginUser } from "../../Redux/authActions";
//import { loginUser, useAuthDispatch, useAuthState } from "../../Context";
import Form from "../Form";
import LoadingIndicator from "../LoadingIndicator";
import MessageContainer from "../MessageContainer";
import ErrorMessage from "../Messages/ErrorMessage";
import InfoMessage from "../Messages/InfoMessage";
import { Wrapper } from "./Login.styles";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            messages: null,
            loading: false,
            shouldRedirectToUser: false,
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.redirectOnLogin = this.redirectOnLogin.bind(this);
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log("Logging in...");
        const payload = {email: this.state.email, password: this.state.password};

        this.props.loginUser(payload);
    }

    inputEmail = (event) => {
        this.setState({email: event.target.value});
    }
  
    inputPassword = (event) => {
        this.setState({password: event.target.value});
    }

    redirectOnLogin = () => {
        setTimeout(() => {
            //useHistory().push('/');
            this.setState({shouldRedirectToUser: true});
        }, 5000);
    }

    render() {
        if (this.state.shouldRedirectToUser) {
            return <Redirect to="/user" />;
        }

        if (this.props.userReducer.token) {
            this.redirectOnLogin();
            return <MessageContainer><InfoMessage>You have successfully logged in! Redirecting to Home.</InfoMessage></MessageContainer>
        }

        return (
            <Form onSubmit={this.handleLogin}>
                <Wrapper>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" onKeyUp={this.inputEmail} />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" onKeyUp={this.inputPassword}/>
                    </div>

                    <input type="submit" />

                </Wrapper>

                {this.props.userReducer.isLoading ? <LoadingIndicator />  : null}
                { this.props.userReducer.message ? <MessageContainer>{this.props.userReducer.message}</MessageContainer> : null }
            </Form>
        );
    }
}


const mapStateToProps = state => {
    return {...state}
};

const mapDispatchToProps = dispatch => ({
    loginUser: (payload) => dispatch(loginUser(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);