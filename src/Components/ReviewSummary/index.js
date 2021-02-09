import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeReview } from "../../Redux/bookActions";
import AuthorsParser from "../../Utilities/ParseAuthorsToComponent";
import { SummaryWrapper } from "../ReviewSummary/ReviewSummary.styles";
import ButtonWithLoading from "../UIButtons/ButtonWithLoading";
import { iconLexicon, SocialButton } from "../UIButtons/SocialImpression";

class ReviewSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewText: "",
            textExpander: null,
            expanded: false,
            isRemoving: false
        };

        this.review = props.review;
        this.book = props.review.book;

        let stars = [];
        for (let i = 0; i < this.review.score; i++) {
            stars.push(<FontAwesomeIcon className="purple" key={i} icon={faStar} />);
        }
        this.stars = stars;
        this.lexicon = iconLexicon;
        let flairKey = 0;
        this.flairs = this.review.flairs ? this.review.flairs.map(flair => <SocialButton activated={true} key={flairKey++} faCode={flair} iconObj={iconLexicon[flair]} lexiconize={false} />) : null;
    
        this.handleReviewClick = this.handleReviewClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        if ( this.review.text.length > 50) {
            this.setState({
                reviewText: this.review.text.substr(0, 50),
                textExpander: "[. . .]",
                expanded: false
            });
        } else {
            this.setState({reviewText: this.review.text});
        }
    }


    handleReviewClick = () => {
        if (this.state.expanded) {
            this.setState({
                reviewText: this.review.text.substr(0, 50),
                textExpander: "[. . .]",
                expanded: false,
            });

        } else {
            const textElements = this.review.text.split('\n').map((item, key) => {
                return <p key={key}>{item}</p>
            });

            this.setState({
                reviewText: textElements,
                textExpander: "[ < ]",
                expanded: true
            });
        }
    } 

    handleDelete = () => {
        let answer = window.confirm("You are about to delete this review.");
        if (answer) {
            this.setState({isRemoving: true});
            this.props.removeReview(this.props.userReducer.token, this.book, this.review);
        }
    }

    render() {
        if (!this.book) {
            console.error("No book associated with this review");
            return null;
        }

        return (
            <SummaryWrapper>
                <div className="flex-row">
                    <p>
                        {this.book.title} ({this.book.publishedAt ? this.book.publishedAt.substr(0, 4) : "N/A"}) by {AuthorsParser(this.book.authors)} 
                    </p>
                </div>
                <div>
                    <div className="flex-row gap--sm">
                        {this.review.summary && <p><em>{this.review.summary}</em></p>}
                        <p>{this.stars}</p>
                        {this.flairs && (
                            <div className="flex-row gap--sm">{this.flairs}</div>
                        )}
                    </div>
                </div>
                <div className="flex-column gap--sm">
                    {this.state.reviewText}
                    {this.state.textExpander && <span className="pointer" onClick={this.handleReviewClick}>{this.state.textExpander}</span>}
                </div>
                <div className="flex-row gap--m">
                    <Link className="button" to={"/review/" + this.book.id}>Edit</Link>
                    <ButtonWithLoading isLoading={this.state.isRemoving} onClick={this.handleDelete} border="var(--orange)">Delete</ButtonWithLoading>
                </div>
            </SummaryWrapper>
    
        );

    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    removeReview: (token, book, review) => dispatch(removeReview(token, book, review))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSummary);