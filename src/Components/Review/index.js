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

const recommend =  {
    fa: faHandHoldingHeart,
    description: "Recommend"
}

class Review extends Component {

    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            impressions: [],
            shortReview: "",
            longReview: "",
            isDraft: false,
            recommend: false,
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
                            <SocialImpression updateImpressions={this.updateImpressions}  />
                            <SocialButton faCode={recommend.fa} updateImpressions={this.updateReccomendation} iconObj={recommend} lexiconize={false} />
                        </div>

                        <label htmlFor="short-review">One sentence review</label>
                        <input id="short-review" type="text" onKeyUp={this.handleShortReview} />
                        <p className="form-hint">Optional</p>

                        <label htmlFor="long-review">Full review</label>
                        <textarea id="long-review" onKeyUp={this.handleLongReview}></textarea>
                        <p className="form-hint">Optional</p>

                        <div className="flex-column">
                            <label htmlFor="is-draft">Draft</label>
                            <input id="is-draft" type="checkbox" onClick={this.handleDraft} />
                        </div>

                        <GenericButton outline onClick={this.handleSubmit} isLoading={this.state.submitting}>Submit</GenericButton>
                    </Form>
                </Content>
            </Wrapper>
        );
    }
}

export const ReviewSummary = ({review}) => {
    const book = review.book;

    if (!book) {
        console.error("No book associated with this review");
        return null;
    }

    let stars = [];
    for (let i = 0; i < review.score; i++) {
        stars.push(<FontAwesomeIcon className="purple" key={i} icon={faStar} />);
    }

    const lexicon = iconLexicon;
    let flairKey = 0;
    const flairs = review.flairs.map(flair => <SocialButton activated={true} key={flairKey++} faCode={flair} iconObj={iconLexicon[flair]} lexiconize={false} />);


    return (
        <SummaryWrapper>
            <div className="flex-row">
                <p>
                    {book.title} ({book.publishedAt ? book.publishedAt.substr(0, 4) : "N/A"}) by {AuthorsParser(book.authors)} 
                </p>
            </div>
            <div>
                <div className="flex-row gap--sm">
                    {review.summary && <p><em>{review.summary}</em></p>}
                    <p>
                        {stars}
                    </p>
                </div>

                {review.text && <p>review.text</p>}
            </div>
            {flairs && (
                <div className="flex-row gap--sm">
                    {flairs}
                </div>
            )}
        </SummaryWrapper>

    );
}

const mapStateToProps = (state) => ({
    ...state
});

const mapDispatchToProps = (dispatch) => ({
    submitReview: (token, book, review) => dispatch(reviewBook(token, book, review)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Review);