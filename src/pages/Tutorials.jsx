import React, { useEffect, useState } from 'react';
import '../styles.css';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => setTutorials(data.tutorials))
      .catch(error => console.error('Error loading tutorials:', error));
  }, []);

  return (
    <div className="grid-container">
      <div id="tutorial-container">
        <h2>GitHub Copilot - Tutorials</h2>
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
  );
};

export default Tutorials;
