const ParseGoogleBookToBook = (googleBook) => {
    let tempImageLinks = {...googleBook.volumeInfo.imageLinks};
    let imageLinks = {};
    for (const [key, value] of Object.entries(tempImageLinks)) {
        imageLinks[key] = parseImageUrls(value);
    }


    return (
        {
            id: googleBook.id,
            title: googleBook.volumeInfo.title,
            authors: googleBook.volumeInfo.authors,
            rating: googleBook.volumeInfo.averageRating,
            categories: googleBook.volumeInfo.categories,
            description: googleBook.volumeInfo.description,
            images: {
                ...imageLinks
            },
            pages: googleBook.volumeInfo.pageCount,
            publishedAt: googleBook.volumeInfo.publishedDate,
            publisher: googleBook.volumeInfo.publisher
        }
    );
}

const parseImageUrls = (imageLink) => {
    let originalTarget = "books.google.com/books/content?id="
    let imageTarget = "books.andersbjorkland.online/book-api/images/"
    return imageLink.replace(originalTarget, imageTarget);
}

export default ParseGoogleBookToBook;