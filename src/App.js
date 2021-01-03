import {useEffect, useState} from "react";

import './App.css';
import ItemSummary from "./Components/ItemSummary";
import Pagination from "./Components/Pagination";
import SearchBar from "./Components/SearchBar";
import Results from "./Components/Results";
import GoogleBooksSearcher from "./Utilities/GoogleBooksSearcher";


function App() {

  const RESULTS_PER_PAGE = 10;
  const [books, setBooks] = useState(null);
  const [numOfResults, setNumOfResults] = useState(null);
  const [query, setQuery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultComponents, setResultComponents] = useState(null);

  const onSearchSubmission = (searchValue) => {
    setQuery(searchValue);
    GoogleBooksSearcher(setBooks, setNumOfResults, searchValue);
  }

  const updatePage = (page) => {
    setCurrentPage(page);
    GoogleBooksSearcher(setBooks, setNumOfResults, query, RESULTS_PER_PAGE * (page - 1));
  }

  useEffect(() => {
    console.log(books);
    if (books){
      let key = 0;
      const bookResults = books.map(book => {
        let innerKey = 0;
        return (
          <ItemSummary key={key++}>
            <div className="flex-row">
              <h3>
                {book.title}
              </h3>
              <p>{book.authors ? book.authors.map(author => <span key={innerKey}>{author} </span> ) : null}</p>
            </div>
            {book.categories ? <div className="flex-row">{book.categories.map(category => <p key={innerKey++}>{category}</p>)}</div> : null}
          </ItemSummary>
        );
      });

      setResultComponents(bookResults);
    }
  }, [books]);
  
  return (
    <div className="App">
      <h1>Book Readers</h1>
      <SearchBar onSubmission={onSearchSubmission} />
      <Pagination 
        resultsPerPage={RESULTS_PER_PAGE} 
        numberOfResults={numOfResults} 
        onClick={updatePage} 
        currentPage={currentPage}
      />
      <Results results={resultComponents} />
    </div>
  );
}

export default App;
