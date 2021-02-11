import { Component } from "react";
import { connect } from "react-redux";
import ToRead from "../Components/ToRead";
import GenericButton from "../Components/UIButtons/GenericButton";
import { loadUserData, logoutUser, unregister, updatePassword } from "../Redux/authActions";
import { CenteredContent, Container, Section, Wrapper } from "./PageLayout";
import ButtonWithLoading from "../Components/UIButtons/ButtonWithLoading";
import CurrentRead from "../Components/CurrentRead";
import ReviewSummary from "../Components/ReviewSummary";
import UpdatePasswordForm from "../Components/UpdatePasswordForm";
import LoadingIndicator from "../Components/LoadingIndicator";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toReadList: null,
            isLoading: false,
            updatePassword: {
                show: false,
                loading: false,
                submitted: false,
                successful: false
            },
            
        }
        this.unregister = this.unregister.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handlePasswordButton = this.handlePasswordButton.bind(this);
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

    async updatePassword(password) {
        this.setState({
            updatePassword: {
                loading: true,
                submitted: false,
                successful: false
            }
        });
        let result = await this.props.updatePassword(this.props.userReducer.token, password);

        if (result.response.status < 300) {
            this.setState({updatePassword: {
                submitted: true,
                successful: true,
                loading: false
            }});
        }
        if (result.response.status > 300) {
            this.setState({updatePassword: {
                submitted: true,
                successful: false,
                loading: false
            }});
        }
    }

    handlePasswordButton() {
        if (this.state.updatePassword.show) {
            this.setState({
                updatePassword: {
                    show: false,
                }
            });
        } else {
            this.setState({
                updatePassword: {
                    show: true,
                    loading: false,
                    submitted: false,
                    successful: false
                }
            });
        }
    }

    render() {
        let reviewId = 0;

        return (
            <Wrapper>
                <Container>
                    <CenteredContent>
                        <div className="wr--100">
                            <Section>
                                <h1>User Details</h1>
                                <p>Logged in as {this.props.userReducer.user}</p>
                                <div className="flex-column">
                                    <GenericButton onClick={this.handlePasswordButton}>Update Password</GenericButton>
                                    {this.state.updatePassword.show && (this.state.updatePassword.loading ? <LoadingIndicator /> : (this.state.updatePassword.submitted ? null : <UpdatePasswordForm onSubmit={this.updatePassword} />))} 
                                    {this.state.updatePassword.show && (this.state.updatePassword.successful && <p>Password was updated.</p>)}
                                </div>
                            </Section>
                            <Section>
                                <h2>Currently Reading</h2>
                                <div className="flex-column gap--m">
                                    {this.props.bookReducer.currentRead ? this.props.bookReducer.currentRead.map(book => <CurrentRead key={book.id} book={book} />) : <p>Nothing here. Add a book you're currently reading.</p>}
                                </div>
                            </Section>
                            <Section>
                                <h2>To-read</h2>
                                <div className="flex-column gap--m">
                                    {this.props.bookReducer.toRead ? this.props.bookReducer.toRead.map(book => <ToRead key={book.id} book={book} />) : <p>Nothing in your list to read.</p>}
                                </div>
                            </Section>
                            <Section>
                                <h2>Reviews</h2>
                                <div className="flex-column gap--m">
                                    {this.props.bookReducer.reviews && this.props.bookReducer.reviews.map(review => <ReviewSummary key={reviewId++} review={review} />) }
                                </div>
                            </Section>
                            <Section>
                                <ButtonWithLoading className="mt-2" isLoading={this.state.isLoading} onClick={this.unregister} border="var(--orange)">Unregister</ButtonWithLoading>
                            </Section>
                        </div>
                    </CenteredContent>
                </Container>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({...state});
const mapDispatchToProps = (dispatch) => ({
    loadData: (token) => dispatch(loadUserData(token)),
    unregister: (token) => dispatch(unregister(token)),
    updatePassword: (token, password) => dispatch(updatePassword(token, password)),
    logout: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);