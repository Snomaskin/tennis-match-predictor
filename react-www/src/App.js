import React from 'react';
import { FormSelect } from './components';
import gitHubIcon from './assets/github-mark.png'
import './main.css';
import backgroundImage from './assets/tennis_court.jpg';


export default function App() {
  return (
      <div className="background-container" style={{ backgroundImage: `url(${backgroundImage})`}}>
        <main className="app-container">
          <h2>Tennis Match Predictor</h2>
          <FormSelect/>
          <a href="https://github.com/Snomaskin/tennis-match-predictor" target="_blank" className="github-icon">
            <img src={gitHubIcon} alt="GitHub Repository" width="50" height="50" />
          </a>
        </main>
      </div>
  );
}