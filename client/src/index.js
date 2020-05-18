import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SimpleMap from "./SimpleMap";

const DEFAULT_COORDS = [-98.5795, 39.8283]


ReactDOM.render(
  <div>
    <App />
    <SimpleMap zoom = {4} lat = {DEFAULT_COORDS[0]} lng = {DEFAULT_COORDS[1]}/>
  </div>,
  document.getElementById('root')
);
