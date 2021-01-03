import GoogleBooksParser from "./GoogleBooksParser";

const GoogleBooksSearcher = (setBooks, setNumOfResults, query, startIndex=0) => {
    const target1 = 'https://www.googleapis.com/books/v1/volumes?q=';
    const paginatedQuery = target1 + query + '&startIndex=' + startIndex;
    console.log(paginatedQuery);
    fetch(paginatedQuery)
        .then(res => res.json())
        .then(
             (result) => {
                setBooks(GoogleBooksParser(result));
                setNumOfResults(result.totalItems);
            },
            (error) => {
                console.log(error);
            }   
        );
}

export default GoogleBooksSearcher;