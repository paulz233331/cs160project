import Home from './pages/home/Home';
import Apply from './pages/apply/Apply'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Confirmation from './pages/Confirmation';
import ApplicationForm from './pages/application/ApplicationForm';

function App() {
  return (
   //<ApplicationForm />

    <Router>
       <div>
               <nav>
                 <ul>
                   <li>
                     <Link to="/">Home</Link>
                   </li>
                <li>
                  <Link to="/apply">Apply</Link>
                </li>
                </ul>
                </nav>
                </div>
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
    */
  );
}

export default App;
