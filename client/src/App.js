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
import Header from './components/shared/Header';
import Exchange from './components/token-exchange/Exchange';
import { useWeb3React } from '@web3-react/core'
import {useAutoConnect } from './hooks'

function App()  {
  
  const context = useWeb3React()
  const { connector, library, chainId, account, activate, deactivate, active, error } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  useAutoConnect();

  
  
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

export default App;
