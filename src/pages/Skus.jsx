import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import getData from '../utils/getData';
import Header from './title-header';

const Skus = () => {
  const [features, setFeatures] = useState({ business: [], enterprise: [] });

  const navigate = useNavigate();

  const handleClick = (id) => {
    // navigate to the video with the given id
    navigate(`/detail?videoId=${id}`);
  };

  useEffect(() => {
    getData()
      .then(data => {
        const business = data.features.videos.find(feature => feature.sku === "GitHub Copilot Business");
        const enterprise = data.features.videos.find(feature => feature.sku === "GitHub Copilot Enterprise");
        setFeatures({ business: business.items, enterprise: enterprise.items });
      })
      .catch(error => console.error('Error loading SKU data:', error));
  }, []);

  return (
    <div>
      <Header title={`GitHub Copilot Business vs Enterprise`}/>
      <div id="main-container">
        <div>
          <div>
            <h2>GitHub Copilot Business</h2>
          </div>
          <div id="business-features" className="sku-grid">
          {
            features.business.map(item => (
              <div key={item.id} className="video-box" onClick={() => handleClick(item.id)}>
                <h3>{item.title}</h3>
                {!item.videoUrl && <div className="coming-soon-small">Coming soon</div>}
              </div>
            ))
          }
          </div>
        </div>
        <div>
          <div>
            <h2>GitHub Copilot Enterprise</h2>
          </div>
          <div id="enterprise-features" className="sku-grid">
          {features.enterprise.map(item => (
            <div key={item.id} className="video-box" onClick={() => handleClick(item.id)}>
              <h3>{item.title}</h3>
              {!item.videoUrl && <div className="coming-soon-small">Coming soon</div>}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skus;
