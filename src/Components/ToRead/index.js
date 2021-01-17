import { useState } from "react";
import { useAuthDispatch, useAuthState } from "../../Context";
import { removeToRead } from "../../Context/actions";
import AuthorsParser from "../../Utilities/ParseAuthorsToComponent";
import LoadingIndicator from "../LoadingIndicator";
import { Wrapper } from "./ToRead.styles";

const ToRead = ({book}) => {

    const dispatch = useAuthDispatch();
    const {userDetails} = useAuthState();
    const [isLoading, setIsLoading] = useState(false);

    const handleRemove = async () => {
        setIsLoading(true);
        console.log("Removing with id: " + book.id);
        const payload = {
            volumeId: book.id,
            auth_token: userDetails.auth_token
        }

        try {
            let response = await removeToRead(dispatch, payload);
            if (!response) {
              return;
            } else {
              setIsLoading(false);
            }
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <Wrapper>
            <p>{book.title} ({book.publishedAt.substr(0, 4)}) by {AuthorsParser(book.authors)}</p>
            {isLoading ? <LoadingIndicator /> : <button onClick={handleRemove}>Remove</button>}
        </Wrapper>
    );
}

export default ToRead;