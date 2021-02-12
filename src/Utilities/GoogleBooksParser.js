import ParseGoogleBookToBook from "./ParseGoogleBookToBook";

const GoogleBooksParser = (queryResult) => {
    const items = queryResult.items.map(item => (
        ParseGoogleBookToBook(item)
    ));

    return items;
}

export default GoogleBooksParser;