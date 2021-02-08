import { Component } from "react";
import { connect } from "react-redux";
import ToRead from "../Components/ToRead";
import { loadUserData, logoutUser, unregister } from "../Redux/authActions";
import { Container, Section, Wrapper } from "./PageLayout";
import ButtonWithLoading from "../Components/UIButtons/ButtonWithLoading";
import CurrentRead from "../Components/CurrentRead";
import { ReviewSummary, reviewSummary } from "../Components/Review";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toReadList: null,
            isLoading: false
        }
        this.unregister = this.unregister.bind(this);
    }

    componentDidMount() {
        this.props.loadData(this.props.userReducer.token);
    }

    async unregister() {
        console.log("unregistering...");
        this.setState({isLoading: true});
        let shouldProceed  =  window.confirm("You are about to unregister. This will delete your user-information and all your generated data. Do you want to proceed?");
        if (shouldProceed) {
            let result = await this.props.unregister(this.props.userReducer.token);
            console.log(result);

            if (result.status < 300) {
                this.setState({isLoading: false});
                this.props.logout();
            } else {
                this.setState({isLoading: false});
            }
        } else {
            this.setState({isLoading: false});
        }
    }

    render() {
        let reviewId = 0;

        return (
            <Wrapper>
                <Container>
                    <h1>User Details</h1>
                    <p>Logged in as {this.props.userReducer.user}</p>
                    <Section>
                        <h2>To-read</h2>
                        {this.props.bookReducer.toRead ? this.props.bookReducer.toRead.map(book => <ToRead key={book.id} book={book} />) : <p>Nothing in your list to read.</p>}
                    </Section>
                    <Section>
                        <h2>Currently Reading</h2>
                        {this.props.bookReducer.currentRead ? this.props.bookReducer.currentRead.map(book => <CurrentRead key={book.id} book={book} />) : <p>Nothing here. Add a book you're currently reading.</p>}
                    </Section>
                    <Section>
                        <h2>Reviews</h2>
                        <div className="flex-column gap--m">
                            {this.props.bookReducer.reviews && this.props.bookReducer.reviews.map(review => <ReviewSummary key={reviewId++} review={review} />) }
                        </div>
                    </Section>
                    <ButtonWithLoading isLoading={this.state.isLoading} onClick={this.unregister} border="var(--orange)">Unregister</ButtonWithLoading>
                </Container>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = (dispatch) => ({
    loadData: (token) => dispatch(loadUserData(token)),
    unregister: (token) => dispatch(unregister(token)),
    logout: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);