import ItemSummary from "../ItemSummary";
import { Content, ItemHeader } from "../ItemSummary/ItemSummary.styles";
import AuthorsParser from "../../Utilities/ParseAuthorsToComponent";
import CategoriesParser from "../../Utilities/ParseCategoriesToComponent";
import { Link } from "react-router-dom";
import { Component } from "react";
import { connect } from "react-redux";
import { addBookToRead } from "../../Redux/bookActions";
import Add from "../UIButtons/Add";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo, faPencilAlt} from "@fortawesome/free-solid-svg-icons";

class BookSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      addBook: false
    }

    this.updateButton = this.updateButton.bind(this);
  }

  componentDidMount() {
    this.updateButton();
  }

  updateButton = () => {
    if (this.props.userReducer.token) {
      let books = [];
      let currentReads = [];

      if (this.props.bookReducer.toRead){
        books = this.props.bookReducer.toRead.filter(book => {
          return book.id === this.props.book.id
        });
      }

      if (this.props.bookReducer.currentRead) {
        currentReads = this.props.bookReducer.currentRead.filter(book => {
          return book.id === this.props.book.id
        });
      }

      if (books.length === 0 && currentReads.length === 0) {
        this.setState({addBook: true});
      }
    }
  }
  
  handleAddToRead = async () => {
    let finished = await this.props.addBookToRead(this.props.userReducer.token, this.props.book);
    if (finished) {
      this.setState(finished);
    }
  }

  render() {

    return (
        <ItemSummary>
            <ItemHeader>
              <h3>{this.props.book.title}</h3>
              {AuthorsParser(this.props.book.authors)}
            </ItemHeader>
            <Content>
              {this.props.book.images.thumbnail ? <img src={this.props.book.images.thumbnail.replace("http:", "https:")} alt=""/> : <div className="img-placeholder"></div>}
              {CategoriesParser(this.props.book.categories, this.props.maxNumCategories)}
              <div className="flex-row gap--sm mt-auto">
                <Link className="button--outline button--small" to={"/details/" + this.props.book.id}><FontAwesomeIcon icon={faInfo} /></Link>
                {this.props.userReducer.token && this.props.reviewLink ? <Link className="button--outline button--small bg--white" to={"/review/" + this.props.book.id}><FontAwesomeIcon icon={faPencilAlt} /></Link> : null}
                {this.state.addBook ? <Add onClick={this.handleAddToRead} animateOnClick={true} /> : null}
              </div>
            </Content>
        </ItemSummary>
    );
  }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
  addBookToRead: (token, book) => dispatch(addBookToRead(token, book)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(BookSummary);