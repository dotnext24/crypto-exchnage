import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Entrypoint from './Entrypoint';

console.log('env',process.env)
ReactDOM.render(<Entrypoint />, document.getElementById('root'));
registerServiceWorker();
