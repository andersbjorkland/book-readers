import { ADD_BOOK, ADD_BOOK_FAIL, ADD_BOOK_SUCCESS, REMOVE_BOOK, REMOVE_BOOK_FAIL, REMOVE_BOOK_SUCCESS } from "../actionTypes"

const initialState = {
    toRead: [] || localStorage.getItem("toRead") ? JSON.parse(localStorage.getItem("toRead")) : "",
    isLoading: false,
}

const bookReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_BOOK:
            return {
                ...state,
                isLoading : true,
            }
        case ADD_BOOK_SUCCESS: 
            console.log("Book added to to-read");
            const toRead = [...state.toRead, action.payload.book];
            localStorage.setItem('toRead', JSON.stringify(toRead));

            return {
                toRead: toRead,
                isLoading: false,
            }
        case ADD_BOOK_FAIL: 
            return {
                ...state,
                isLoading: false,
            }
        case REMOVE_BOOK: {
            return {
                ...state,
                isLoading: true
            }
        }
        case REMOVE_BOOK_SUCCESS: {
            const removingBook = action.payload.book;
            const toRead = [...state.toRead].filter(book => book.id !== removingBook.id);
            return {
                ...state,
                toRead: toRead,
                isLoading: false
            }
        }
        case REMOVE_BOOK_FAIL: {
            return {
                ...state,
                isLoading: false
            }
        }
        default: 
            return {...state}
    }
}

export default bookReducer;