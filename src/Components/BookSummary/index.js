import ItemSummary from "../ItemSummary";
import { Content, ItemHeader } from "../ItemSummary/ItemSummary.styles";

const BookSummary = ({book}) => {
    let authorKey = 0;
    let categoryKey = 0;
    const numberOfAuthors = book.authors ? book.authors.length : 0;
    return (
        <ItemSummary>
            <ItemHeader>
              {book.categories ? <div className="item-footer">{book.categories.map(category => <p key={categoryKey++}>{category}</p>)}</div> : <p>Not specified</p>}
            </ItemHeader>
            <Content>
              {book.images.thumbnail ? <img src={book.images.thumbnail} alt=""/> : <div className="img-placeholder"></div>}
              <h3>{book.title}</h3>
              <div className="flex-row">
                <p>{book.authors ? book.authors.map(author => (
                  <span key={authorKey++}>{semiAbbreviateName(author) + (authorKey + 1 === numberOfAuthors ? "" : 
                    authorKey > 0 && authorKey + 2 === numberOfAuthors ? " & " : ", "
                  )} </span>
                  ) ) : null}</p>
              </div>
            </Content>
        </ItemSummary>
    );
}

const semiAbbreviateName = (name) => {
  let abbreviatedName = "";
  const nameElements = name.split(' ');
  console.log(nameElements);
  for (let i = 0; i < nameElements.length; i++) {
    if (i === nameElements.length - 1) {
      abbreviatedName += nameElements[i];
    } else {
      abbreviatedName += nameElements[i].charAt(0) + ".\u00A0";
    }
  }

  return abbreviatedName;
}

export default BookSummary;