import GoogleBooksParser from "./GoogleBooksParser";

const GoogleBooksSearcher = (setBooks, setNumOfResults, query, startIndex=0) => {
    // Misc options for queries:
    // Restrict to a specific language: '&langRestrict=en'
    // Read more at: https://developers.google.com/books/docs/v1/using

    const target1 = 'https://www.googleapis.com/books/v1/volumes?q=';
    const paginatedQuery = target1 + query + '&startIndex=' + startIndex;
    console.log(paginatedQuery);
    fetch(paginatedQuery)
        .then(res => res.json())
        .then(
             (result) => {
                console.log(result);
                setBooks(GoogleBooksParser(result));
                setNumOfResults(result.totalItems);
            },
            (error) => {
                console.log(error);
            }   
        );
}

export default GoogleBooksSearcher;