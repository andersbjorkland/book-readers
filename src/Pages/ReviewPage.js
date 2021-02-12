import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookSummary from "../Components/BookSummary";
import LoadingIndicator from "../Components/LoadingIndicator";
import Review from "../Components/Review";
import { loadBookDetails } from "../Utilities/simpleActions";
import { CenteredContent, Container, Wrapper } from "./PageLayout";

const ReviewPage = (props) => {
    const [book, setBook] = useState(null);
    const [message, setMessage] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        
        async function fetchBook(id) {
            try {
                const result = await loadBookDetails(id);
                if (result) {
                    setBook(result);
                }
            } catch (error) {
                setMessage("Something went wrong. Could not find the book!");
            }
            
        }
        fetchBook(id);
    },[id]);


    if (message) {
        return (
            <Wrapper>
                <Container>
                    <h1>Review</h1>
                    <p>{message}</p>
                </Container>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Container>
                <CenteredContent>
                    <h1>Reviewing</h1>
                    {book ? <BookSummary book={book} maxNumCategories={1} reviewLink={false} /> : <LoadingIndicator />}
                    {book ? <Review book={book} /> : null} 
                </CenteredContent>
            </Container>
        </Wrapper>
    );
    
}


export default ReviewPage;