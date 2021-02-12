import { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../../Redux/authActions";

const Button = styled.button`
    height: 2rem;
    background-color: white;
    color: var(--blue);
    border: none;
    border-radius: 0.2rem;
`;

class Logout extends Component {
    
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        return (
            <Button className={this.props.className} onClick={this.handleLogout}>Logout</Button>
        );
    }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);