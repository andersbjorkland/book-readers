import './App.css';
import SearchBar from "./Components/SearchBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import DetailsPage from "./Pages/DetailsPage";
import ResultsPage from "./Pages/ResultsPage";
import { GlobalStyle } from './GlobalStyle';


function App() {
  
  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <h1>Book Readers</h1>
        <SearchBar baseUrl="/search" />
      </div>
      <Switch>
        <Route path="/search" children={<ResultsPage />} />
        <Route path="/details/:id" children={<DetailsPage />} />
        <Route path="/" children={<ResultsPage />} />
      </Switch>
    </Router>
  );
}

export default App;
