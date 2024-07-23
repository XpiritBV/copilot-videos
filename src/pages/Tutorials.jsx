import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import getData from '../utils/getData';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    getData()
      .then(data => setTutorials(data.tutorials))
      .catch(error => console.error('Error loading tutorials:', error));
  }, []);

  return (
    <div>
      <Link to="/" className="back-button">Back to Home</Link>
      <div><h2 id="title">GitHub Copilot - Tutorials</h2></div>
      <div className="grid-container">
        <div id="tutorial-container">
          <div id="tutorials-list">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="tutorial-item">
                <h3>{tutorial.title}</h3>
                <p>{tutorial.description}</p>
                <a href={tutorial.url} target="_blank" rel="noopener noreferrer">Watch Tutorial</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
