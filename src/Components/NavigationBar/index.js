import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import Logout from "../UIButtons/Logout";
import { LinkContainer, Nav, Wrapper } from "./NavigationBar.styles";

class NavigationBar extends Component {

    render() {

        return(
            <Wrapper>
                <Nav>
                    <div className="serif"><Link className="no-ul" to="/">Book Readers</Link></div>
                    <LinkContainer>
                        <SearchBar baseUrl="/search" />
                        {this.props.userReducer.user ? <Link className="button" to="/user">My Corner</Link> : null}
                        {this.props.userReducer.user ? <Logout /> : <Link className="button button--white black" to="/login">Login</Link>}
                    </LinkContainer>
                </Nav>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({...state});

export default connect(mapStateToProps)(NavigationBar);