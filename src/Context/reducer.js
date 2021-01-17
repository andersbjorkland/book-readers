import React, { useReducer } from "react";
import ParseGoogleBookToBook from "../Utilities/ParseGoogleBookToBook";
 
let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).auth_token
  : "";

let toRead = localStorage.getItem("toRead") ? JSON.parse(localStorage.getItem("toRead")) : "";
 
export const initialState = {
  userDetails: "" || user,
  toRead: [] || toRead,
  token: "" || token,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
                loading: true
            };

        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                userDetails: action.payload.user,
                user: action.payload.user.user,
                token: action.payload.user.auth_token,
                loading: false
            };

        case "LOGOUT":
            return {
                ...initialState,
                userDetails: "",
                user: "",
                token: ""
            };
    
        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            };
        case "ADD_TO_READ":
            return {
                ...initialState,
                loading: true
            };
        case "SUCCESS_ADD_TO_READ":
            console.log(action.payload);
            const books = action.payload.toRead.map(book => ParseGoogleBookToBook(book));
            console.log(books);
            return {
                ...initialState,
                toRead: books,
                loading: false
            };
        case "FAILED_ADD_TO_READ":
            return {
                ...initialState,
                loading: false
            };

        case "REMOVE_TO_READ":
            return {
                ...initialState,
                loading: true
            };
        
        case "SUCCESS_REMOVE_TO_READ":
            const books2 = action.payload.toRead.map(book => ParseGoogleBookToBook(book));
            localStorage.setItem('toRead', JSON.stringify(books2));
            return {
                ...initialState,
                toRead: books2,
                loading: false
            };

        case "FAILED_REMOVE_TO_READ":
            return {
                ...initialState,
                loading: false
            }
    
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};