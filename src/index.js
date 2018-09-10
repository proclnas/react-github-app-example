import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faEye, faStar);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
