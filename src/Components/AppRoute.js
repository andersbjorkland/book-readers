import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../Context";
 
 
const AppRoute = ({ component: Component, path, isPrivate, ...rest }) => {
 
    const {userDetails} = useAuthState();
    return (
        <Route
            path={path}
            render={props =>
                isPrivate && !Boolean(userDetails.auth_token) ? (
                    <Redirect
                        to={{ pathname: "/login" }}
                    />
                ) : (
                        <Component {...props} />
                    )
            }
            {...rest}
        />
    )
}
 
export default AppRoute