const GoogleBooksParser = (queryResult) => {
    const items = queryResult.items.map(item => (
        {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            rating: item.volumeInfo.averageRating,
            categories: item.volumeInfo.categories,
            images: {
                small: item.volumeInfo.imageLinks.smallThumbnail,
                thumbnail: item.volumeInfo.imageLinks.thumbnail
            },
            pages: item.volumeInfo.pageCount,
            publishedAt: item.volumeInfo.publishedDate,
            publisher: item.volumeInfo.publisher
        }
    ));

    return items;
}

export default GoogleBooksParser;