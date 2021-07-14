import Home from './pages/home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Confirmation from './pages/Confirmation';
import ApplicationForm from './pages/application/ApplicationForm'

function App() {
  return (
    <ApplicationForm />
    // <Router>
    //   <Switch>
    //   <Route path="/" exact>
    //     <Home />
    //   </Route>
    //   <Route path="/profile" exact>
    //     test
    //   </Route>
    //   <Route path="/confirmation" exact>
    //     <Confirmation />
    //   </Route>
    //   </Switch>
    // </Router>
  );
}

export default App;
