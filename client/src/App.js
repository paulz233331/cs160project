import Home from './pages/home/Home';
import Apply from './pages/apply/Apply';
import Employer from './pages/employer/Employer';
import EmployerInfo from './pages/employerInfo/EmployerInfo';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Confirmation from './pages/Confirmation';

function App() {
  return (
   //<ApplicationForm />
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
    <Route path="/employer" exact>
    <Employer />
    </Route>
    <Route path="/employer-info" exact>
    <EmployerInfo />
    </Route>
    </Switch>
    </Router>
  );
}

export default App;
