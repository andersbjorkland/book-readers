import { faBook, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addBookToRead, removeBookToRead } from "../../Redux/bookActions";
import AuthorsParser from "../../Utilities/ParseAuthorsToComponent";
import Close from "../UIButtons/Close";
import GenericSmallButton from "../UIButtons/GenericSmallButton";
import { ControlsContainer, Wrapper } from "./CurrentRead.styles";

class CurrentRead extends Component {

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

  addToRead = () => {
    const token = this.props.userReducer.token;
    
    if (token) {
      this.props.addToRead(token, this.props.book);
    }
  }

  render() {
    const book = this.props.book;
    return (
        <Wrapper>
          <ControlsContainer>
            <Close onClose={this.handleRemove} animateOnClick={true} />
            <Link className="button--outline button--small bg--white" to={"/details/" + this.props.book.id}><FontAwesomeIcon icon={faInfo} /></Link>
            <GenericSmallButton isLoading={false} onClick={this.addToRead} toolTip="Move to To-read"><FontAwesomeIcon icon={faBook} /></GenericSmallButton>
          </ControlsContainer>
          <div>
            <p>
              {book.title} ({book.publishedAt ? book.publishedAt.substr(0, 4) : "N/A"}) by {AuthorsParser(book.authors)} 
            </p>
          </div>
            
        </Wrapper>
    );
  }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
  removeToRead: (token, book) => dispatch(removeBookToRead(token, book)),
  addToRead: (token, book) => dispatch(addBookToRead(token, book))
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentRead);