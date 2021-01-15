import './App.css';
import SearchBar from "./Components/SearchBar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { GlobalStyle } from './GlobalStyle';
import routes from './Config/routes';
import { AuthProvider } from './Context';
import UserBar from './Components/UserBar';


function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <UserBar />
        <div className="app-container">
          <h1>Book Readers</h1>
          <SearchBar baseUrl="/search" />
          <Switch>
            {routes.map((route) => (
              <Route
                exact={route.exact ? true : false}
                key={route.path}
                path={route.path}
                component={route.component} 
              />
            ))}
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
