import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import JetLagCalculator from './JetLagCalculator';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <JetLagCalculator />
  </React.StrictMode>
);
