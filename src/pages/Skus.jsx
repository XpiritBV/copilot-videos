import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import getData from '../utils/getData';

const Skus = () => {
  const [features, setFeatures] = useState({ business: [], enterprise: [] });

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
      <Link to="/" className="back-button">Back to Home</Link>
      <div id="main-container">
        <div id="business-features" className="sku-grid">
          <h2>GitHub Copilot Business</h2>
          {features.business.map(item => (
            <div key={item.id} className="video-box" onClick={() => window.location.href = `/detail?videoId=${item.id}`}>
              <h3>{item.title}</h3>
              {!item.videoUrl && <div className="coming-soon-small">Coming soon</div>}
            </div>
          ))}
        </div>
        <div id="enterprise-features" className="sku-grid">
          <h2>GitHub Copilot Enterprise</h2>
          {features.enterprise.map(item => (
            <div key={item.id} className="video-box" onClick={() => window.location.href = `/detail?videoId=${item.id}`}>
              <h3>{item.title}</h3>
              {!item.videoUrl && <div className="coming-soon-small">Coming soon</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skus;
