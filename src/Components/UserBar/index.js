import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { checkTokenStillValid } from "../../Redux/authActions";
import Logout from "../UIButtons/Logout";
import { BarWrapper, InnerContainer } from "./UserBar.styles";

class UserBar extends Component {
    constructor(props) {
        super(props);

        if (this.props.userReducer.token) {
            this.props.checkAuthentication(this.props.userReducer.token);
        }
    }

    render() {
        if (!this.props.userReducer.user || !this.props.userReducer.token) {
            return null;
        }

        return (
            <BarWrapper>
                <InnerContainer>
                    <p>Logged on: <Link to="/user">{this.props.userReducer.user}</Link></p>
                </InnerContainer>
            </BarWrapper>
        );
    }

    
}

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = (dispatch) => ({
    checkAuthentication: (token) => dispatch(checkTokenStillValid(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);