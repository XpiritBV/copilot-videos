import React, { useEffect, useState } from 'react';
import '../styles.css';
import getData from '../utils/getData';
import Header from './title-header';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    getData()
      .then(data => setTutorials(data.tutorials))
      .catch(error => console.error('Error loading tutorials:', error));
  }, []);

  return (
    <div>
      <Header title="GitHub Copilot - Tutorials" />
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
