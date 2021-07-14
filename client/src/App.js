import Home from './pages/home/Home';
import Apply from './pages/apply/Apply'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Confirmation from './pages/Confirmation';

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
    <Route path="/confirmation" exact>
    <Confirmation />
    </Route>
    <Route path="/apply" exact>
    <Apply />
    </Route>
    </Switch>
    </Router>
  );
}

export default App;
