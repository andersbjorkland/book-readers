const GoogleBooksParser = (queryResult) => {
    const items = queryResult.items.map(item => (
        {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            rating: item.volumeInfo.averageRating,
            categories: item.volumeInfo.categories,
            description: item.volumeInfo.description,
            images: {
                small: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : null,
                thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null
            },
            pages: item.volumeInfo.pageCount,
            publishedAt: item.volumeInfo.publishedDate,
            publisher: item.volumeInfo.publisher
        }
    ));

    return items;
}

export default GoogleBooksParser;