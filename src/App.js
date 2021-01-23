import './App.css';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { GlobalStyle } from './GlobalStyle';
import routes from './Config/routes';
import AppRoute from './Components/AppRoute';
import NavigationBar from './Components/NavigationBar';


function App() {

  return (
    
    <Router>
      <GlobalStyle />
      <NavigationBar />
      <div className="app-container">
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
