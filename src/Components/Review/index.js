import Form from "../Form";
import { Component, useEffect, useState } from "react";
import Score from "../UIButtons/Score";
import SocialImpression, { iconLexicon, SocialButton } from "../UIButtons/SocialImpression";
import { Content, SummaryWrapper, Wrapper } from "./Review.styles";
import GenericButton from "../UIButtons/GenericButton";
import { reviewBook } from "../../Redux/bookActions";
import { connect } from "react-redux";
import { faHandHoldingHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { CenteredContent } from "../../Pages/PageLayout";
import AuthorsParser from "../../Utilities/ParseAuthorsToComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ButtonWithLoading from "../UIButtons/ButtonWithLoading";

const recommend =  {
    fa: faHandHoldingHeart,
    description: "Recommend"
}

class Review extends Component {

    constructor(props) {
        super(props);

        const reviews = [...props.bookReducer.reviews];
        const filteredReviews = reviews.filter(review => review.book.id === props.book.id);
        const review = filteredReviews.length > 0 ? filteredReviews[0] : null;
        console.log({review});

        this.state = {
            score: review?.score || 0,
            impressions: review?.flairs || [],
            shortReview: review?.summary ||"",
            longReview: review?.text ||"",
            isDraft: review?.isDraft ||false,
            recommend: review?.recommended || false,
            submitting: false,
            submitSuccessful: false,
        }

        this.handleShortReview = this.handleShortReview.bind(this);
        this.handleLongReview = this.handleLongReview.bind(this);
        this.handleDraft = this.handleDraft.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateImpressions = this.updateImpressions.bind(this);
        this.setScore = this.setScore.bind(this);
        this.updateReccomendation = this.updateReccomendation.bind(this);
    }

    setScore = (score) => {
        this.setState({
            score: score
        });
    }

    handleShortReview = (event) => {
        this.setState({
            shortReview: event.target.value
        })
    }

    handleLongReview = (event) => {
        this.setState({
            longReview: event.target.value
        })
    }

    handleDraft = (event) => {
        this.setState({isDraft: event.target.checked});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({submitting: true});
        const review = {
            book: this.props.book,
            score: this.state.score,
            impressions: this.state.impressions,
            shortReview: this.state.shortReview,
            longReview: this.state.longReview,
            recommend: this.state.recommend,
            isDraft: this.state.isDraft
        };

        console.log({...review});
        let response = this.props.submitReview(this.props.userReducer.token, this.props.book, review);

        console.log(response);
        response.then(() => {
                this.setState({submitting: false, submitSuccessful: true});
            }
        ).catch(error => {
            this.setState({submitting: false});
            console.log(error);
        })
    }

    updateImpressions = (isAdding, impression) => {
        if (isAdding) {
            this.setState({
                impressions: [...this.state.impressions, impression]
            });
        } else {
            this.setState({
                impressions: [...this.state.impressions].filter(impress => impress !== impression)
            });
        }
    }

    updateReccomendation = (recommend, impression) => {
        this.setState({
            recommend: recommend
        });
    }

    render() {

        if (this.state.submitSuccessful) {
            return (
                <Wrapper>
                    <Content>
                        <CenteredContent>
                            <p>Submit successful!</p>
                        </CenteredContent>
                    </Content>
                </Wrapper>
            );
        }

        console.log(this.state);

        return (
            <Wrapper>
                <Content>
                    <Form>
                        <div className="flex-column">
                            <label>Score</label>
                            <Score setScore={this.setScore} selectedScore={this.state.score} />
                        </div>

                        <div className="flex-column">
                            <label>Impressions</label>
                            <SocialImpression updateImpressions={this.updateImpressions} impressions={this.state.impressions} />
                            <SocialButton faCode={recommend.fa} updateImpressions={this.updateReccomendation} activated={this.state.recommend} iconObj={recommend} lexiconize={false} />
                        </div>

                        <label htmlFor="short-review">One sentence review</label>
                        <input id="short-review" type="text" onChange={this.handleShortReview} defaultValue={this.state.shortReview} />
                        <p className="form-hint">Optional</p>

                        <label htmlFor="long-review">Full review</label>
                        <textarea id="long-review" onChange={this.handleLongReview} defaultValue={this.state.longReview}></textarea>
                        <p className="form-hint">Optional</p>

                        <div className="flex-column">
                            <label htmlFor="is-draft">Draft</label>
                            <input id="is-draft" type="checkbox" onChange={this.handleDraft} checked={this.state.isDraft} />
                        </div>

                        <GenericButton outline onClick={this.handleSubmit} isLoading={this.state.submitting}>Submit</GenericButton>
                    </Form>
                </Content>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    ...state
});

const mapDispatchToProps = (dispatch) => ({
    submitReview: (token, book, review) => dispatch(reviewBook(token, book, review)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Review);