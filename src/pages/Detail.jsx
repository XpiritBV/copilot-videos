import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../styles.css';
import getData from '../utils/getData';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Detail = () => {
//  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);

  const query = useQuery();
  const videoId = query.get('videoId');

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
        if (!details) {
          throw new Error(`Video with id [${videoId}] not found`);
        }
        setVideoDetails(details);
      })
      .catch(error => console.error('Error loading video details:', error));
  }, [videoId]);

  if (!videoDetails) {
    return <div>Could not load video information</div>;
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
            src={
              // handle both youtu.be and youtube.com URLs to embed the video correctly
              videoDetails.videoUrl.includes("youtu.be")
                ? videoDetails.videoUrl.replace("youtu.be", "youtube.com/embed")
                : videoDetails.videoUrl.replace("youtube.com", "youtube.com/embed")
            }
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
