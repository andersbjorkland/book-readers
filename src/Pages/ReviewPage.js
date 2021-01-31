import { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../Components/LoadingIndicator";
import { loadUserData, logoutUser, unregister } from "../Redux/authActions";
import { loadBookDetails } from "../Utilities/simpleActions";
import { Container, Section, Wrapper } from "./PageLayout";

const ReviewPage = () => {
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
                    console.log(result)
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
                <h1>Review: {book.title}</h1>
                {isLoading ?? <LoadingIndicator />}
                <Section>
                    <h2>How did you like it?</h2>
                </Section>
            </Container>
        </Wrapper>
    );
    
}


export default ReviewPage;