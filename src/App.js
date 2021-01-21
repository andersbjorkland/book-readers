import './App.css';
import SearchBar from "./Components/SearchBar";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { GlobalStyle } from './GlobalStyle';
import routes from './Config/routes';
import { AuthProvider } from './Context';
import UserBar from './Components/UserBar';
import AppRoute from './Components/AppRoute';
import { Provider } from 'react-redux';
import store from './Redux/store';


function App() {
  return (
    
    <Router>
      <GlobalStyle />
      <UserBar />
      <div className="app-container">
        <h1>Book Readers</h1>
        <SearchBar baseUrl="/search" />
        <Switch>
          {routes.map((route) => {
            return (
            <AppRoute
              exact={route.exact ? true : false}
              key={route.path}
              path={route.path}
              component={route.component} 
              isPrivate={route.isPrivate}
            />
          )})}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
