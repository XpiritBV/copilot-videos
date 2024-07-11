import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';
import getData from '../utils/getData';

const Detail = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    getData()
      .then(data => {
        let details;
        data.features.videos.forEach(feature => {
          feature.items.forEach(item => {
            if (item.id == videoId) {
              details = item;
            }
          });
        });
        setVideoDetails(details);
      })
      .catch(error => console.error('Error loading video details:', error));
  }, [videoId]);

  if (!videoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div id="feature-detail-container" style={{ textAlign: 'center' }}>
      <a href="javascript:history.back()" style={{ display: 'inline-block', marginBottom: '20px' }}>Back</a>
      <h1 id="feature-title">{videoDetails.title}</h1>
      <div id="video-container">
        {videoDetails.videoUrl ? (
          <iframe
            id="feature-video"
            width="560"
            height="315"
            src={videoDetails.videoUrl.replace("youtube.com", "youtube.com/embed")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div id="coming-soon" className="coming-soon">
            <div>Video coming Soon</div>
          </div>
        )}
      </div>
      <div id="description-container">
        <p id="feature-description">{videoDetails.description}</p>
      </div>
    </div>
  );
};

export default Detail;
