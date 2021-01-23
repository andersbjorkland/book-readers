import {CenteredContent, Container, Wrapper} from "./PageLayout";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Hero = styled.div`
    font-size: 1.3rem;
    font-family: 'Crimson Text', serif;
    background-color: var(--purple);
    color: white;
    margin-top: 2rem;

    h1 {
        text-align: left;
    }

    a {
        color: white;
    }

    max-width: 40rem;
    height: 20rem;
    padding: 2rem;
`;

const StartPage = (props) => {
    return (
        <Wrapper>
            <Container>
                <CenteredContent>
                    <Hero>
                        <h1>Book Readers</h1>
                        <p>We love reading, listening, writing and talking about books.</p>
                        <p>Want to <Link to="/register">join our corner</Link>?</p>
                    </Hero>
                </CenteredContent>
            </Container>
        </Wrapper>
    );
}

export default StartPage;