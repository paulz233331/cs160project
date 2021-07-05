import Home from './pages/home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/profile" exact>
        test
      </Route>
      </Switch>
    </Router>
  );
}

export default App;
