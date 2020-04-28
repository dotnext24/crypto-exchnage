import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Entrypoint from './Entrypoint';


ReactDOM.render(<Entrypoint />, document.getElementById('root'));
registerServiceWorker();
