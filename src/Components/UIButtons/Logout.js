import { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { logout, useAuthDispatch } from "../../Context";
import { logoutUser } from "../../Redux/authActions";

const Button = styled.button`
    height: 2rem;
    background-color: white;
    color: var(--blue);
    border: none;
`;

class Logout extends Component {
    
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        console.log("Logging out");
        this.props.logout();
    }

    render() {
        return (
            <Button onClick={this.handleLogout}>Logout</Button>
        );
    }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);