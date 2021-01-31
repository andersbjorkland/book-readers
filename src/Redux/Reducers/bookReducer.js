import { ADD_BOOK, ADD_BOOK_FAIL, ADD_BOOK_SUCCESS, ADD_CURRENTLY_READING, ADD_CURRENTLY_READING_FAIL, ADD_CURRENTLY_READING_SUCCESS, LOAD_USER_DATA_SUCCESS, REMOVE_BOOK, REMOVE_BOOK_FAIL, REMOVE_BOOK_SUCCESS } from "../actionTypes"

const initialState = {
    toRead: [] || localStorage.getItem("toRead") ? JSON.parse(localStorage.getItem("toRead")) : "",
    isLoading: false,
    currentRead: [] || (localStorage.getItem("currentRead") ? JSON.parse(localStorage.getItem("currentRead")) : null),
}

const bookReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_BOOK:
            return {
                ...state,
                isLoading : true,
            };
        case ADD_BOOK_SUCCESS: 
            console.log("Book added to to-read");
            const toRead = [...state.toRead, action.payload.book];
            const currentRead = [...state.currentlyReading].filter(book => book.id !== action.payload.book.id);
            localStorage.setItem('currentRead', JSON.stringify(currentRead));
            localStorage.setItem('toRead', JSON.stringify(toRead));

            return {
                toRead: toRead,
                currentRead: currentRead,
                isLoading: false,
            };
        case ADD_BOOK_FAIL: 
            return {
                ...state,
                isLoading: false,
            };
        case REMOVE_BOOK: {
            return {
                ...state,
                isLoading: true
            };
        }
        case REMOVE_BOOK_SUCCESS: {
            const removingBook = action.payload.book;
            const toRead = [...state.toRead].filter(book => book.id !== removingBook.id);
            return {
                ...state,
                toRead: toRead,
                isLoading: false
            };
        }
        case REMOVE_BOOK_FAIL: {
            return {
                ...state,
                isLoading: false
            };
        }
        case ADD_CURRENTLY_READING: {
            console.log(state);
            return {...state};
        }
        case ADD_CURRENTLY_READING_SUCCESS: {
            const currentlyReading = [...state.currentlyReading, action.payload.book];
            const toRead = [...state.toRead].filter(toRead => toRead.id !== action.payload.book.id);
            localStorage.setItem('currentRead', JSON.stringify(currentlyReading));
            localStorage.setItem('toRead', JSON.stringify(toRead));

            return {
                ...state,
                currentlyReading: currentlyReading,
                toRead: toRead
            }
        }
        case ADD_CURRENTLY_READING_FAIL: {
            return {...state}
        }
        case LOAD_USER_DATA_SUCCESS: {

            const toRead = action.payload.toRead;
            const currentRead = action.payload.currentRead;
            localStorage.setItem('toRead', JSON.stringify(toRead));
            localStorage.setItem('currentRead', JSON.stringify(currentRead));
            return {
                ...state,
                toRead: [...toRead],
                currentRead: [...currentRead]
            }
        }
        default: 
            return {...state};
    }
}

export default bookReducer;