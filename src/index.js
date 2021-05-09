import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom"

ReactDOM.render(
  <BrowserRouter forceRefresh={true}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
