import { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useAuthState } from "../../Context";
import Logout from "../UIButtons/Logout";
import { BarWrapper, InnerContainer } from "./UserBar.styles";

class UserBar extends Component {

    render() {
        if (!this.props.userReducer.user) {
            return null;
        }

        return (
            <BarWrapper>
                <InnerContainer>
                    <p>{this.props.userReducer.user}</p>
                    <Logout />
                </InnerContainer>
            </BarWrapper>
        );
    }

    
}

const mapStateToProps = (state) => ({...state});

export default connect(mapStateToProps)(UserBar);