import { LOAD_USER_DATA, LOAD_USER_DATA_FAIL, LOAD_USER_DATA_SUCCESS, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actionTypes";

const initialState = {
    token: null || localStorage.getItem('token'),
    user: null || localStorage.getItem('user'),
    toRead: null,
    example: "Reading from Redux Store.",
    isLoading: false,
    isLoadingUserData: false,
    message: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER: {
            console.log("Logging in (reducer)");
            return {...state, isLoading: true}
        }
        case LOGIN_USER_FAIL: {
            return {...state, isLoading: false}
        }
        case LOGIN_USER_SUCCESS: {
            console.log("Logged in successfully (reducer)");
            const token = action.payload.token;
            const user = action.payload.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);

            console.log(action);
            return {
                ...state, 
                isLoading: false,
                token: token,
                user: user
            }
        }
        case LOGOUT_USER: {
            return {
                ...state,
                token: null,
                user: null
            }
        }
        case LOAD_USER_DATA: {
            return {
                ...state,
                isLoadingUserData: true
            }
        }
        case LOAD_USER_DATA_SUCCESS: {
            console.log(action);
            return {
                ...state,
                isLoadingUserData: false,
                toRead: action
            }
        }
        case LOAD_USER_DATA_FAIL: {
            console.log(action);
            return {
                ...state,
                isLoadingUserData: false,
            }
        }
        default: {
            return state;
        }
    }
}

export default userReducer;