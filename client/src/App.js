import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import About from './components/token-exchange/About';
import Users from './components/token-exchange/Exchange';
import Header from './components/shared/Header';
import Exchange from './components/token-exchange/Exchange';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();

    this.setState({ responseToPost: body });
  };

  render() {
    return <div>
       <Router>
           
       <Header></Header>
        
        <Switch>
          <Route path="/about">
            <About></About>
          </Route>
         
          <Route path="/">
            <Exchange></Exchange>
          </Route>
        </Switch>
      
    </Router>
  
    </div>
  }
}

export default App;
