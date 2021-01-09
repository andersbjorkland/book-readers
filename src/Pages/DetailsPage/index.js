import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { Container, Wrapper } from "../PageLayout";
import ParseGoogleBookToBook from "../../Utilities/ParseGoogleBookToBook";
import ParseAuthorsToComponent from "../../Utilities/ParseAuthorsToComponent";
import ParseCategoriesToComponent from "../../Utilities/ParseCategoriesToComponent";


const DetailsPage = () => {
    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    
    useEffect(() => {
        const target = 'https://books.andersbjorkland.online/api/details/' + id;
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
            <Container>
                {book.images.medium ? <img src={book.images.medium.replace("http:", "https:")} alt=""/> : <div className="img-placeholder"></div>}
                <h1>{book.title}</h1>
                {ParseAuthorsToComponent(book.authors)}
                <p>{book.publishedAt}</p>
                <p>{book.description}</p>
                {ParseCategoriesToComponent(book.categories)}
            </Container>
        </Wrapper>
    );
}

export default DetailsPage;