import axios from "axios"
import ParseGoogleBookToBook from "../Utilities/ParseGoogleBookToBook";
import { AUTH_VALIDATION, LOAD_USER_DATA, LOAD_USER_DATA_FAIL, LOAD_USER_DATA_SUCCESS, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER } from "./actionTypes"


const ROOT_URL = process.env.REACT_APP_ROOT_URL;

const loading = () => {
    return {
        type: LOGIN_USER
    }
}

export const authenticatedUser = (response) => {
    const data = response.data;
    console.log(data);

    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: data.token,
            user: data.user
        }
    }
}

export const failedLogin = (error) => {
    return {
        type: LOGIN_USER_FAIL,
        payload: {
            error: error
        }
    }
}

export const loginUser = ({email, password}) => {
    return function (dispatch) {
        dispatch(loading());

        axios({
            method: 'post',
            url: ROOT_URL + '/login',
            data: {email: email, password: password}
        }).then(
            (response) => dispatch(authenticatedUser(response)) 
        ).catch(error => {
            dispatch(failedLogin(error));
        });
    }
}

export const logoutUser = () => {
    return function (dispatch) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT_USER });
      }
}

export const loadUserData = (token) => {
    return function (dispatch) {
        dispatch({type: LOAD_USER_DATA});
        console.log(token);

        axios({
            method: 'get',
            url: ROOT_URL + '/user',
            headers: { 'Authorization': token}
        })
        .then(response => {
            console.log(response);
            const toReadList = response.data.toRead.map(book => ParseGoogleBookToBook(book));

            dispatch({
                type: LOAD_USER_DATA_SUCCESS,
                payload: {
                    toRead: toReadList
                }
            });
        })
        .catch(error => {
            console.log(error);
            dispatch({
                type: LOAD_USER_DATA_FAIL,
                payload: error
            });
            dispatch(checkTokenStillValid(token));
        });
    }
}

export const checkTokenStillValid = (token) => {
    console.log("Checking token: " + token);
    return function (dispatch) {
        axios({
            method: 'get',
            url: ROOT_URL + '/user/auth',
            headers: { 'Authorization': token}
        })
        .then(response => {
            dispatch({
                type: AUTH_VALIDATION,
                payload: {
                    status: response.status,
                    token: response.data.token,
                    user: response.data.user
                }
            });
        })
        .catch(error => {
            console.error(error);
            dispatch({
                type: AUTH_VALIDATION,
                payload: {
                    status: 401
                }
            });
        });
    }
}