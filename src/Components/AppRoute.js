import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class AppRoute extends Component {
    constructor(props) {
        super(props);
        const { component: Component, path, isPrivate, ...rest } = props;
        this.state = {
            isPrivate: isPrivate,
            path: path,
            component: Component,
            rest: rest,
        }
        
    }

    render() {

        if (this.state.isPrivate && !Boolean(this.props.userReducer.token)) {
            return (
                <Redirect
                    to={{ pathname: "/login" }}
                />
            );
        } 

        return (
            <Route
                path={this.state.path}
                render={props => {
                    return <this.state.component {...props} />;
                }}
                {...this.state.rest}
            />
        );
    }
}

const mapStateToProps = state => ({
    ...state
});
 
export default connect(mapStateToProps)(AppRoute);
//export default AppRoute;