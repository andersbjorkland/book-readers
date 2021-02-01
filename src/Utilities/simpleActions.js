import axios from "axios";
import ParseGoogleBookToBook from "./ParseGoogleBookToBook";

export const loadBookDetails = (id) => {
    const target = window.location.hostname === 'localhost' ? process.env.REACT_APP_BOOK_DETAILS_DEV + id : process.env.REACT_APP_BOOK_DETAILS + id;
    console.log(target);
    return axios.get(target)
        .then(result => ParseGoogleBookToBook(result.data));
}