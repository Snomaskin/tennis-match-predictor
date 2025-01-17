import React from 'react';
import { FormSelect } from './components';
import { INPUTS } from './config';
import './style.css';


export default function App() {
  return (
      <div className="background-container">
        <div className="overlay">
          <div className="content-wrapper">
            <h2>Tennis Match Predictor</h2>
              <div className="app-container">
                <main className="main-content">
                  <FormSelect inputs={ INPUTS }/>
                </main>
              </div>
          </div>
          <a href="https://github.com/Snomaskin/tennis-match-predictor" target="_blank" className="github-icon">
                <img src="/github-mark.png" alt="GitHub Repository" width="50" height="50" />
              </a>
        </div>
      </div>
  );
}