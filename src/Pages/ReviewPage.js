import { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import BookSummary from "../Components/BookSummary";
import LoadingIndicator from "../Components/LoadingIndicator";
import Review from "../Components/Review";
import { loadUserData, logoutUser, unregister } from "../Redux/authActions";
import { loadBookDetails } from "../Utilities/simpleActions";
import { CenteredContent, Container, Flexed, Section, Wrapper } from "./PageLayout";

const ReviewPage = (props) => {
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        
        async function fetchBook(id) {
            console.log("Fetching...");
            try {
                const result = await loadBookDetails(id);
                if (result) {
                    setBook(result);
                }
            } catch (error) {
                console.log();
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