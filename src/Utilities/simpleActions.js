import axios from "axios";
import ParseGoogleBookToBook from "./ParseGoogleBookToBook";

export const loadBookDetails = (id) => {
    const target = 'https://books.andersbjorkland.online/book-api/details/' + id;

    return axios.get(target)
        .then(result => ParseGoogleBookToBook(result.data));
}