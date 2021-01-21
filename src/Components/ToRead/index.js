import { Component, useState } from "react";
import { connect } from "react-redux";
import { useAuthDispatch, useAuthState } from "../../Context";
import { removeToRead } from "../../Context/actions";
import { removeBookToRead } from "../../Redux/bookActions";
import AuthorsParser from "../../Utilities/ParseAuthorsToComponent";
import LoadingIndicator from "../LoadingIndicator";
import ButtonWithLoading from "../UIButtons/ButtonWithLoading";
import Close from "../UIButtons/Close";
import { ControlsContainer, Wrapper } from "./ToRead.styles";

class ToRead extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  handleRemove = async () => {
    this.setState({isLoading: true});
    console.log("Removing with id: " + this.props.book.id);

    const token = this.props.userReducer.token;
    if (token) {
      try {
        let response = await this.props.removeToRead(token, this.props.book);
        if (!response) {
          return;
        } else {
          this.setState({isLoading: false});
        }
      } catch (error) {
        console.log(error);
      }
    } 
  }

  render() {
    const book = this.props.book;
    return (
        <Wrapper>
          <ControlsContainer>
            <Close onClose={this.handleRemove} animateOnClick={true} />
          </ControlsContainer>
          <div>
            <p>{book.title} ({book.publishedAt ? book.publishedAt.substr(0, 4) : "N/A"}) by {AuthorsParser(book.authors)}</p>
          </div>
            
        </Wrapper>
    );
  }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
  removeToRead: (token, book) => dispatch(removeBookToRead(token, book))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToRead);