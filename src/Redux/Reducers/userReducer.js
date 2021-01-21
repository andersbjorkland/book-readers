import { AUTH_VALIDATION, LOAD_USER_DATA, LOAD_USER_DATA_FAIL, LOAD_USER_DATA_SUCCESS, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actionTypes";

const initialState = {
    token: null || localStorage.getItem('token'),
    user: null || localStorage.getItem('user'),
    isLoading: false,
    isLoadingUserData: false,
    message: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_VALIDATION: {
            if (action.payload.status >= 300) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return {
                    ...state,
                    user: null,
                    token: null
                }
            }
            
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', action.payload.user);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            }
        }
        case LOGIN_USER: {
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

            return {
                ...state, 
                isLoading: false,
                token: token,
                user: user
            }
        }
        case LOGOUT_USER: {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

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

            const toRead = action.payload.toRead;
            localStorage.setItem('toRead', JSON.stringify(toRead));
            return {
                ...state,
                isLoadingUserData: false,
                toRead: [...toRead]
            }
        }
        case LOAD_USER_DATA_FAIL: {
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