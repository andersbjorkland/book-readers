import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import BookSummary from "../../Components/BookSummary";
import Pagination from "../../Components/Pagination";
import Results from "../../Components/Results";
import GoogleBooksSearcher from "../../Utilities/GoogleBooksSearcher";
import { Wrapper } from "./ResultsPage.styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResultsPage = () => {
    const query = useQuery();
    const page = query.get("p") ? query.get("p") : 1;

    const searchQuery = query.get("q");

    const RESULTS_PER_PAGE = 10;

    const [books, setBooks] = useState(null);
    const [numOfResults, setNumOfResults] = useState(null);
    const [currentPage, setCurrentPage] = useState(parseInt(page));
    const [resultComponents, setResultComponents] = useState(null);

    useEffect(() => {
      setCurrentPage(parseInt(page));
      if (searchQuery) {
        GoogleBooksSearcher(setBooks, setNumOfResults, searchQuery, RESULTS_PER_PAGE * (page - 1));
      }
    }, [searchQuery, page]);

    useEffect(() => {
        if (books){
          let key = 0;
          const bookResults = books.map(book => {
            return (
              <BookSummary key={key++} book={book}/>
            );
          });
    
          setResultComponents(bookResults);
        }
      }, [books]);

    return (
        <Wrapper>
            <h2>Results</h2>
            <Results results={resultComponents} />
            <Pagination 
                resultsPerPage={RESULTS_PER_PAGE} 
                numberOfResults={numOfResults} 
                baseUrl={"/search?q=" + searchQuery + "&p="}
                currentPage={currentPage}
            />
        </Wrapper>
    );
}

export default ResultsPage;