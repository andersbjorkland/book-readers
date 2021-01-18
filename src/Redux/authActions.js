import axios from "axios"
import { LOAD_USER_DATA, LOAD_USER_DATA_FAIL, LOAD_USER_DATA_SUCCESS, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER } from "./actionTypes"


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
        dispatch({ type: LOGOUT_USER });
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
      }
}

export const loadUserData = (token) => {
    return function (dispatch) {
        dispatch({type: LOAD_USER_DATA});

        axios({
            method: 'get',
            url: ROOT_URL + '/user',
            headers: { 'Authorization': token}
        })
        .then(response => {
            dispatch({
                type: LOAD_USER_DATA_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: LOAD_USER_DATA_FAIL,
                payload: error
            })
        });
    }
}