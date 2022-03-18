import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './components/base/response.css';

ReactDOM.render(
  <BrowserRouter basename="/todo-list">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
