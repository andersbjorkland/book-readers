import { ADD_BOOK, ADD_BOOK_FAIL, ADD_BOOK_SUCCESS, ADD_CURRENTLY_READING, ADD_CURRENTLY_READING_FAIL, ADD_CURRENTLY_READING_SUCCESS, ADD_REVIEW_SUCCESS, LOAD_USER_DATA_SUCCESS, REMOVE_BOOK, REMOVE_BOOK_FAIL, REMOVE_BOOK_SUCCESS, REMOVE_CURRENTLY_READING, REMOVE_CURRENTLY_READING_FAIL, REMOVE_CURRENTLY_READING_SUCCESS, REMOVE_REVIEW_SUCCESS } from "../actionTypes"

const initialState = {
    toRead: localStorage.getItem("toRead") ? JSON.parse(localStorage.getItem("toRead")) : [],
    isLoading: false,
    currentRead: localStorage.getItem("currentRead") ? JSON.parse(localStorage.getItem("currentRead")): [],
    reviews: localStorage.getItem("reviews") ? JSON.parse(localStorage.getItem("reviews")): [],
}

const bookReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_BOOK:
            return {
                ...state,
                isLoading : true,
            };
        case ADD_BOOK_SUCCESS: 
            const toRead = [...state.toRead, action.payload.book];
            const currentRead = state.currentRead.length > 0 ? [...state.currentRead].filter(book => book.id !== action.payload.book.id) : [];
            localStorage.setItem('currentRead', JSON.stringify(currentRead));
            localStorage.setItem('toRead', JSON.stringify(toRead));

            return {
                ...state,
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
            return {...state};
        }
        case ADD_CURRENTLY_READING_SUCCESS: {
            const currentRead = [...state.currentRead, action.payload.book];
            const toRead = state.toRead.length > 0 ? [...state.toRead].filter(book => book.id !== action.payload.book.id) : [];
            localStorage.setItem('currentRead', JSON.stringify(currentRead));
            localStorage.setItem('toRead', JSON.stringify(toRead));

            return {
                ...state,
                currentRead: currentRead,
                toRead: toRead
            }
        }
        case ADD_CURRENTLY_READING_FAIL: {
            return {...state}
        }
        case REMOVE_CURRENTLY_READING: {
            return {
                ...state,
                isLoading: true
            };
        }
        case REMOVE_CURRENTLY_READING_SUCCESS: {
            const removingBook = action.payload.book;
            const currentRead = [...state.currentRead].filter(book => book.id !== removingBook.id);
            return {
                ...state,
                currentRead: currentRead,
                isLoading: false
            };
        }
        case REMOVE_CURRENTLY_READING_FAIL: {
            return {
                ...state,
                isLoading: false
            };
        }
        case LOAD_USER_DATA_SUCCESS: {

            const toRead = action.payload.toRead;
            const currentRead = action.payload.currentRead;
            const reviews = action.payload.reviews;
            localStorage.setItem('toRead', JSON.stringify(toRead));
            localStorage.setItem('currentRead', JSON.stringify(currentRead));
            localStorage.setItem('reviews', JSON.stringify(reviews));

            return {
                ...state,
                toRead: [...toRead],
                currentRead: [...currentRead],
                reviews: [...reviews]
            }
        }
       
        case ADD_REVIEW_SUCCESS: {
            const review = {
                book: action.payload.review.book,
                flairs: [...action.payload.review.impressions],
                isDraft: action.payload.review.isDraft,
                recommended: action.payload.review.recommend,
                score: action.payload.review.score,
                summary: action.payload.review.shortReview,
                text: action.payload.review.longReview
            };
            const reviews = [];
            let reviewIsAdded = false;
            for (let i = 0; i < state.reviews.length; i++) {
                if (state.reviews[i].book.id.localeCompare(review.book.id)) {
                    reviews.push(review);
                    reviewIsAdded = true;
                } else {
                    reviews.push(state.reviews[i]);
                }
            }
            if (!reviewIsAdded) {
                reviews.push(review);
                reviewIsAdded = true;
            }
            localStorage.setItem('reviews', JSON.stringify(reviews));

            return {
                ...state,
                reviews: reviews
            }
        }
        case REMOVE_REVIEW_SUCCESS: {
            const reviews = [...state.reviews].filter(review => review.book.id !== action.payload.review.book.id);
            localStorage.setItem('reviews', JSON.stringify(reviews));

            return {
                ...state,
                reviews: reviews
            }
        }
        default: 
            return {...state};
    }
}

export default bookReducer;