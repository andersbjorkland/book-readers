import {Component, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import BookSummary from "../../Components/BookSummary";
import LoadingIndicator from "../../Components/LoadingIndicator";
import Pagination from "../../Components/Pagination";
import Results from "../../Components/Results";
import SearchBar from "../../Components/SearchBar";
import GoogleBooksSearcher from "../../Utilities/GoogleBooksSearcher";
import {Wrapper, Container} from "../PageLayout";

function useQuery() {
  return new URLSearchParams(window.location.search);
}

const ResultsPage = () => {
    const query = useQuery();
    const page = query.get("p") ? query.get("p") : 1;


    const RESULTS_PER_PAGE = 10;

    const [books, setBooks] = useState(null);
    const [numOfResults, setNumOfResults] = useState(null);
    const [currentPage, setCurrentPage] = useState(parseInt(page));
    const [resultComponents, setResultComponents] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [searchQuery, setSearchQuery] = useState(null);


    useEffect(() => {
      setCurrentPage(parseInt(page));
      if (searchQuery) {
        setIsFetching(true);
        GoogleBooksSearcher(setIsFetching, setBooks, setNumOfResults, searchQuery, RESULTS_PER_PAGE * (page - 1));
      }

    }, [searchQuery, page]);

    useEffect(() => {
        if (books){
          let key = 0;
          const bookResults = books.map(book => {
            return (
              <BookSummary key={key++} book={book} reviewLink={true} maxNumCategories={-1}/>
            );
          });
    
          setResultComponents(bookResults);
        }
      }, [books]);

    useEffect(() => {
      const updatedQ = new URLSearchParams(window.location.search).get("q");
      if (updatedQ === query.get("q")) {
        setSearchQuery(updatedQ);
      }
    });

    return (
        <Wrapper>
          <Container>
            {resultComponents ? <h2>Results</h2> : isFetching ? <h2>Results</h2> : null}
            {isFetching ? <LoadingIndicator /> : <Results results={resultComponents} />}
            
            <Pagination 
                resultsPerPage={RESULTS_PER_PAGE} 
                numberOfResults={numOfResults} 
                baseUrl={"/search?q=" + searchQuery + "&p="}
                currentPage={currentPage}
            />
          </Container>
        </Wrapper>
    );
}

const RESULTS_PER_PAGE = 10;

class ResultsPage2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      isFetching: false,
      numOfResults: null,
      searchQuery: "",
      currentPage: 1
    }
  }

  render() {
    return (
      <Wrapper>
          <Container>
            {this.state.results ? <h2>Results</h2> : this.state.isFetching ? <h2>Results</h2> : null}
            {this.state.isFetching ? <LoadingIndicator /> : <Results results={this.state.results} />}
            
            <Pagination 
                resultsPerPage={RESULTS_PER_PAGE} 
                numberOfResults={this.state.numOfResults} 
                baseUrl={"/search?q=" + this.state.searchQuery + "&p="}
                currentPage={this.state.currentPage}
            />
          </Container>
        </Wrapper>
    );
  }
}

export default ResultsPage;