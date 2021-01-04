import './App.css';
import SearchBar from "./Components/SearchBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ResultsPage from "./Pages/ResultsPage";


function App() {
  
  return (
    <Router>
      <div className="App">
        <h1>Book Readers</h1>
        <SearchBar baseUrl="/search" />
      </div>
      <Switch>
        <Route path="/search" children={<ResultsPage />} />
        <Route path="/" children={<ResultsPage />} />
      </Switch>
    </Router>
  );
}

export default App;
