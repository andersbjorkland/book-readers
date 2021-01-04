import ItemSummary from "../ItemSummary";

const BookSummary = ({book}) => {
    let authorKey = 0;
    let categoryKey = 0;
    return (
        <ItemSummary>
            {book.images.small ? <img src={book.images.small} alt=""/> : <div className="img-placeholder"></div>}
            <div className="flex-row">
              <h3>
                {book.title}
              </h3>
              <p>{book.authors ? book.authors.map(author => <span key={authorKey++}>{author} </span> ) : null}</p>
            </div>
            {book.categories ? <div className="flex-row">{book.categories.map(category => <p key={categoryKey++}>{category}</p>)}</div> : null}
        </ItemSummary>
    );
}

export default BookSummary;