import axios from "axios"
import ParseGoogleBookToBook from "../Utilities/ParseGoogleBookToBook";
import { AUTH_VALIDATION, LOAD_USER_DATA, LOAD_USER_DATA_FAIL, LOAD_USER_DATA_SUCCESS, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER, UNREGISTER_USER, UNREGISTER_USER_FAIL, UNREGISTER_USER_SUCCESS } from "./actionTypes"


const ROOT_URL = window.location.hostname === 'localhost' ? process.env.REACT_APP_ROOT_URL_DEV : process.env.REACT_APP_ROOT_URL;


const loading = () => {
    return {
        type: LOGIN_USER
    }
}

export const authenticatedUser = (response) => {
    const data = response.data;

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

export const updatePassword = (token, password) => {
    return function (dispatch) {
        return axios({
            method: 'post',
            url: ROOT_URL + '/user/update-password',
            headers: { 'Authorization': token},
            data: {password: password}
        })
        .then((response) => ({response: response, isSuccess: true}))
        .catch(error => ({response: error, isSuccess: false}));
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

        axios({
            method: 'get',
            url: ROOT_URL + '/user',
            headers: { 'Authorization': token}
        })
        .then(response => {
            const toReadList = response.data.toRead.map(book => ParseGoogleBookToBook(book));
            const currentReadList = response.data.currentRead.map(book => ParseGoogleBookToBook(book));
            const reviews = response.data.reviews.map(review => ({...review, book: ParseGoogleBookToBook(review.book)}))

            dispatch({
                type: LOAD_USER_DATA_SUCCESS,
                payload: {
                    toRead: toReadList,
                    currentRead: currentReadList,
                    reviews: reviews
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

export const unregister = (token) => {
    return function (dispatch) {
        dispatch({type: UNREGISTER_USER});

        return axios({
            method: 'get',
            url: ROOT_URL + '/user/unregister',
            headers: { 'Authorization': token}
        })
        .then(response => {
            dispatch({
                type: UNREGISTER_USER_SUCCESS
            });
            return response;
        })
        .catch( error => {
            console.error(error);
            dispatch({
                type: UNREGISTER_USER_FAIL
            });
            return error;
        });
    }
}

export const checkTokenStillValid = (token) => {
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