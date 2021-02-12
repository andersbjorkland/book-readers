import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { Container, Flexed, Header, Wrapper } from "../PageLayout";
import ParseGoogleBookToBook from "../../Utilities/ParseGoogleBookToBook";
import ParseAuthorsToComponent from "../../Utilities/ParseAuthorsToComponent";
import ParseCategoriesToComponent from "../../Utilities/ParseCategoriesToComponent";
import AddBookToRead from "../../Components/UIButtons/AddBookToRead";


const DetailsPage = () => {
    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    
    useEffect(() => {
        const target = window.location.hostname === 'localhost' ? process.env.REACT_APP_BOOK_DETAILS_DEV + id : process.env.REACT_APP_BOOK_DETAILS + id;

        setIsFetching(true);
        fetch(target)
            .then(res => res.json())
            .then(
                (result) => {
                    if (!result.volumeInfo) {
                        return new Error("No book found");
                    }
                    const parsedBook = ParseGoogleBookToBook(result);
                    setBook(parsedBook);
                },
                (error) => {
                    console.log(error);
                }   
            )
            .then(() => setIsFetching(false));
    }, [id]);

    if (isFetching) {
        return (
            <Wrapper>
                <Container>
                    <p>...loading</p>
                </Container>
            </Wrapper>
        );
    }

    if (!isFetching && !book) {
        return null;
    }

    return (
        <Wrapper>
            <Container className="md-width">
                <Header>
                    <h1>{book.title}</h1>
                </Header>
                <Flexed>
                    {book.images.small ? <img className="m-center" src={book.images.small.replace("http:", "https:")} alt=""/> : <div className="img-placeholder"></div>}
                    <div className="summary">
                        <h2>{ParseAuthorsToComponent(book.authors)}</h2>
                        <p><time>{book.publishedAt}</time></p>
                        
                        <div className="cursive">
                            {ParseCategoriesToComponent(book.categories)}
                        </div>

                        {book ? <AddBookToRead book={book} /> : null}
                        
                    </div>
                </Flexed>
                <div className="m-center" dangerouslySetInnerHTML={{__html: book.description}} />
            </Container>
        </Wrapper>
    );
}

export default DetailsPage;