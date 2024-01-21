import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Testimonials from '../src/HomePage/Testimonials'


// const store = createStore(allReducers, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Testimonials />
  </React.StrictMode>
);


