import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadUserData, logoutUser, unregister } from "../../Redux/authActions";
import SearchBar from "../SearchBar";
import Logout from "../UIButtons/Logout";
import { LinkContainer, Nav, Wrapper } from "./NavigationBar.styles";
import logo from "../../images/logo192.png";

class NavigationBar extends Component {

    componentDidMount() {
        if (!this.props.userReducer.hasLoadedUserData && this.props.userReducer.token) {
            this.props.loadData(this.props.userReducer.token);
        }
    }

    render() {

        return(
            <Wrapper>
                <Nav>
                    <div className="serif brand"><Link className="no-ul flex-row gap--sm" to="/"><img src={logo} alt=""/><div className="optional">Book Readers</div></Link></div>
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

const mapDispatchToProps = (dispatch) => ({
    loadData: (token) => dispatch(loadUserData(token)),
    unregister: (token) => dispatch(unregister(token)),
    logout: () => dispatch(logoutUser())
})
const mapStateToProps = state => ({...state});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);