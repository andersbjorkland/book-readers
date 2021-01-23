import { Component } from "react";
import { connect } from "react-redux";
import { addBookToRead } from "../../Redux/bookActions";
import Add from "./Add";

class AddBookToRead extends Component {
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
            <div className="flex-row gap--sm mt-auto">
                {this.state.addBook ? <Add onClick={this.handleAddToRead} animateOnClick={true} /> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({...state});
const mapDispatchToProps = dispatch => ({
    addBookToRead: (token, book) => dispatch(addBookToRead(token, book))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBookToRead);