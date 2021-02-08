import axios from "axios";
import { ADD_BOOK, ADD_BOOK_FAIL, ADD_BOOK_SUCCESS, ADD_CURRENTLY_READING, ADD_CURRENTLY_READING_FAIL, ADD_CURRENTLY_READING_SUCCESS, ADD_REVIEW, ADD_REVIEW_FAIL, ADD_REVIEW_SUCCESS, REMOVE_BOOK, REMOVE_BOOK_FAIL, REMOVE_BOOK_SUCCESS, REMOVE_CURRENTLY_READING, REMOVE_CURRENTLY_READING_FAIL, REMOVE_CURRENTLY_READING_SUCCESS } from "./actionTypes";

const ROOT_URL = window.location.hostname === 'localhost' ? process.env.REACT_APP_ROOT_URL_DEV : process.env.REACT_APP_ROOT_URL;


export const addBookToRead = (token, book) => {
    return function (dispatch) {
        dispatch({type: ADD_BOOK});

        let data = axios({
            method: 'post',
            url: ROOT_URL + '/user/to-read',
            headers: { 'Authorization': token},
            data: {token: token, volumeId: book.id}
        })
        .then(response => {
            console.log(response);
            dispatch({type: ADD_BOOK_SUCCESS, payload: {book: book}});
            return ({isLoading: false, addBook: false});
        })
        .catch(error => {
            console.log(error);
            dispatch({type: ADD_BOOK_FAIL});
            return ({isLoading: false});
        });

        console.log(data);
        

        return data;
    }
}

export const removeBookToRead = (token, book) => {
    return function (dispatch) {
        dispatch({type: REMOVE_BOOK});

        let data = axios({
            method: 'delete',
            url: ROOT_URL + '/user/to-read',
            headers: { 'Authorization': token},
            data: {token: token, volumeId: book.id}
        })
        .then(response => {
            console.log(response.data);
            dispatch({type: REMOVE_BOOK_SUCCESS, payload: {book: book, message: response.data.message}});
            return response.data;
        })
        .catch(error => {
            console.log(error);
            dispatch({type: REMOVE_BOOK_FAIL})
            return error;
        });
    }
}

export const addCurrentlyReading = (token, book) => {
    return function (dispatch) {
        dispatch({type: ADD_CURRENTLY_READING});

        let data = axios({
            method: 'post',
            url: ROOT_URL + '/user/current-read',
            headers: { 'Authorization': token},
            data: {token: token, volumeId: book.id}
        })
        .then(response => {
            console.log(response);
            dispatch({type: ADD_CURRENTLY_READING_SUCCESS, payload: {book: book}});
            return ({isLoading: false, addBook: false});
        })
        .catch(error => {
            console.log(error);
            dispatch({type: ADD_CURRENTLY_READING_FAIL});
            return ({isLoading: false});
        });

        console.log(data);
        

        return data;
    }
}

export const removeBookCurrentRead = (token, book) => {
    return function (dispatch) {
        dispatch({type: REMOVE_CURRENTLY_READING});

        let data = axios({
            method: 'delete',
            url: ROOT_URL + '/user/current-read',
            headers: { 'Authorization': token},
            data: {token: token, volumeId: book.id}
        })
        .then(response => {
            console.log(response.data);
            dispatch({type: REMOVE_CURRENTLY_READING_SUCCESS, payload: {book: book, message: response.data.message}});
            return response.data;
        })
        .catch(error => {
            console.log(error);
            dispatch({type: REMOVE_CURRENTLY_READING_FAIL})
            return error;
        });
    }
}

export const reviewBook = (token, book, review) => {
    return function (dispatch) {
        dispatch({type: ADD_REVIEW});

        let data = axios({
            method: 'post',
            url: ROOT_URL + '/user/review',
            headers: { 'Authorization': token},
            data: {volumeId: book.id, review: review}
        })
        .then(response => {
            console.log(response);
            dispatch({type: ADD_REVIEW_SUCCESS, payload: {review: review}});
            return ({isLoading: false, addBook: false});
        })
        .catch(error => {
            console.log(error);
            dispatch({type: ADD_REVIEW_FAIL});
            return ({isLoading: false});
        });

        console.log(data);
        

        return data;
    }
}