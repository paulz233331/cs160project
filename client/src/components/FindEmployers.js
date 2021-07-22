import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

    axios.defaults.port = 8080;
class FindEmployers extends Component {
     
  state = {
    employers :[]
  }

  componentDidMount(){
    //console.log("mounted");
    const response = axios.get('http://localhost:8080/api/employers')
      .then( (response) => {
        if ( response.data ){
          this.setState({
            employers : response.data
          })
        }
//        console.log(response.data);
      } )
      .catch(err => console.log(err));
  }

  render() {
    let { employers } = this.state;
    var jobs = "";
    employers.map(item => {
      jobs = jobs + item.employer + ' - ' + item.job_title;
    } );
    return(
      <div>
        <h1>Current positions</h1>
        {jobs}
      </div>
    )
  }
}

export default FindEmployers;