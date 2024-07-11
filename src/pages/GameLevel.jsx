import React, { useEffect, useState } from 'react';
import '../styles.css';

const GameLevel = () => {
  const [level, setLevel] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let levelIndex = queryParams.get('level');
    levelIndex = parseInt(levelIndex) - 1;

    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        if (levelIndex < 0 || levelIndex >= data.adventure.levels.length) {
          console.log('Invalid level index');
          return;
        } else {
          console.log('Level index:', levelIndex);
        }
        const levelData = data.adventure.levels[levelIndex];
        setLevel(levelData);

        let videoUrl = levelData.videoUrl;
        if (videoUrl.includes("youtu.be")) {
          videoUrl = videoUrl.replace("youtu.be", "youtube.com/embed");
        } else {
          videoUrl = videoUrl.replace("youtube.com", "youtube.com/embed");
        }
        setVideoUrl(videoUrl);
      })
      .catch(error => console.error('Error loading level data:', error));
  }, []);

  if (!level) {
    return <div>Loading...</div>;
  }

  return (
    <div id="feature-detail-container" style={{ textAlign: 'center' }}>
      <a href="javascript:history.back()" style={{ display: 'inline-block', marginBottom: '20px' }}>Back</a>
      <h1 id="feature-title">Level {level.title}</h1>
      <div id="video-container">
        <iframe
          id="feature-video"
          width="900"
          height="544"
          src={videoUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div id="description-container">
        <p id="feature-description" style={{ fontSize: 'xx-large', maxWidth: '900px' }}>
          {level.description}
        </p>
      </div>
    </div>
  );
};

export default GameLevel;