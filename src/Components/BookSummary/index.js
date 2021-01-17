import ItemSummary from "../ItemSummary";
import { Content, ItemHeader } from "../ItemSummary/ItemSummary.styles";
import AuthorsParser from "../../Utilities/ParseAuthorsToComponent";
import CategoriesParser from "../../Utilities/ParseCategoriesToComponent";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../Context";
import { useEffect, useState } from "react";
import { addToRead } from "../../Context/actions";

const BookSummary = ({book}) => {
  const {userDetails} = useAuthState();
  const [addToReadButton, setAddToReadButton] = useState(null);
  const volumeId = book.id;
  const dispatch = useAuthDispatch();

  const handleAddToRead = async () => {
    const payload = {
      volumeId: volumeId,
      auth_token: userDetails.auth_token
    }

    console.log(payload);

    try {
      let response = await addToRead(dispatch, payload);
      if (!response) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (userDetails.user) {
      const addButton = <button onClick={handleAddToRead}>Add to-read</button>
      setAddToReadButton(addButton);
    } else {
      setAddToReadButton(null);
    }
  }, [userDetails]);
  
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
              {addToReadButton}
            </Content>
        </ItemSummary>
    );
}

export default BookSummary;