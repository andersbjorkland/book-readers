import ItemSummary from "../ItemSummary";
import { Content, ItemHeader } from "../ItemSummary/ItemSummary.styles";
import AuthorsParser from "../../Utilities/ParseAuthorsToComponent";
import CategoriesParser from "../../Utilities/ParseCategoriesToComponent";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../Context";
import { Component, useEffect, useState } from "react";
import { addToRead } from "../../Context/actions";
import { connect } from "react-redux";
import { addBookToRead } from "../../Redux/bookActions";
import { render } from "@testing-library/react";
import ButtonWithLoading from "../UIButtons/ButtonWithLoading";

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

      if (this.props.bookReducer.toRead){
        books = this.props.bookReducer.toRead.filter(book => {
          return book.id === this.props.book.id
        });
      }

      if (books.length === 0) {
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
              {CategoriesParser(this.props.book.categories)}
            </ItemHeader>
            <Content>
              {this.props.book.images.thumbnail ? <img src={this.props.book.images.thumbnail.replace("http:", "https:")} alt=""/> : <div className="img-placeholder"></div>}
              <h3>{this.props.book.title}</h3>
              {AuthorsParser(this.props.book.authors)}
              <Link to={"/details/" + this.props.book.id}>Details</Link>
              {this.state.addBook ? <ButtonWithLoading className="mt-auto" isLoading={this.state.isLoading} onClick={this.handleAddToRead}>Add to-read</ButtonWithLoading> : null}
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