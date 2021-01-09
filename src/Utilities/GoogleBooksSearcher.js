import GoogleBooksParser from "./GoogleBooksParser";

const GoogleBooksSearcher = (setIsFetching, setBooks, setNumOfResults, query, startIndex=0) => {
    // Misc options for queries:
    // Restrict to a specific language: '&langRestrict=en'
    // Read more at: https://developers.google.com/books/docs/v1/using

    const target = 'https://books.andersbjorkland.online/api/';
    const paginatedQuery = target + query + '&startIndex=' + startIndex;
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
        )
        .then(() => setIsFetching(false));
}

export default GoogleBooksSearcher;