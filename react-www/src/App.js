import React from 'react';
import { FormSelect } from './components';
import gitHubIcon from './assets/github-mark.png'
import './main.css';


export default function App() {
  return (
      <div className="background-container">
        <div className="form-box">
          <main className="main-content">
            <h2>Tennis Match Predictor</h2>
            <FormSelect/>
          </main>
          <a href="https://github.com/Snomaskin/tennis-match-predictor" target="_blank" className="github-icon">
            <img src={gitHubIcon} alt="GitHub Repository" width="50" height="50" />
          </a>
        </div>
      </div>
  );
}