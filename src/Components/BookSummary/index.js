import ItemSummary from "../ItemSummary";
import { Content, ItemHeader } from "../ItemSummary/ItemSummary.styles";
import AuthorsParser from "../../Utilities/ParseAuthorsToComponent";
import CategoriesParser from "../../Utilities/ParseCategoriesToComponent";
import { Link } from "react-router-dom";

const BookSummary = ({book}) => {
    return (
        <ItemSummary>
            <ItemHeader>
              {CategoriesParser(book.categories)}
            </ItemHeader>
            <Content>
              {book.images.thumbnail ? <img src={book.images.thumbnail.replace("http:", "https:")} alt=""/> : <div className="img-placeholder"></div>}
              <h3>{book.title}</h3>
              {AuthorsParser(book.authors)}
              <Link to={"/details/" + book.id}>Details</Link>
            </Content>
        </ItemSummary>
    );
}

export default BookSummary;