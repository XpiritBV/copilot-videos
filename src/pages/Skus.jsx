import React, { useEffect, useState, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import getData from '../utils/getData';
import Header from './title-header';

const Skus = () => {
  const [features, setFeatures] = useState({ individual: [], business: [], enterprise: [], ghesFiltered: true });

  const navigate = useNavigate();

  const handleClick = (id) => {
    // navigate to the video with the given id
    navigate(`/detail?videoId=${id}`);
  };

  const getElementByKey = (key) => {
    const element = document.querySelector(`[data-key="${key}"]`);
    return element;
  }

  const toggleFeature = (item, style) => {
    if (!item.ghes_support) {
      const feature = getElementByKey(item.id);
      if (feature) {
        feature.style.display = style;
      }
    }
  }

  const handleGHESToggle = () => {
    // show/hide the videos that do not have the ghes_support tag
    if (features.ghesFiltered) {
      features.ghesFiltered = false;

      features.individual.forEach(item => {
        toggleFeature(item, 'block');
      });

      features.business.forEach(item => {
        toggleFeature(item, 'block');
      });

      features.enterprise.forEach(item => {
        toggleFeature(item, 'block');
      });

      document.getElementById('ghesToggle').classList.remove('on');
    }
    else {
      features.ghesFiltered = true;
      
      features.individual.forEach(item => {
        toggleFeature(item, 'none');
      });

      features.business.forEach(item => {
        toggleFeature(item, 'none');
      });

      features.enterprise.forEach(item => {
        toggleFeature(item, 'none');
      });

      document.getElementById('ghesToggle').classList.add('on');
    }
  }

  useEffect(() => {
    getData()
      .then(data => {
        const individual = data.features.videos.find(feature => feature.sku_id === 1);
        const business = data.features.videos.find(feature => feature.sku_id === 2);
        const enterprise = data.features.videos.find(feature => feature.sku_id === 3);
        setFeatures({individual: individual.items, business: business.items, enterprise: enterprise.items, ghesFiltered: false });
        handleGHESToggle();
      })
      .catch(error => console.error('Error loading SKU data:', error));
  }, []);

  return (
    <div>
      <Header title={`GitHub Copilot Features per license type`}/>
      
      <button 
          id="ghesToggle"
          className={`toggle-button`}
          onClick={() => handleGHESToggle()}
          style={{float:`right`}}>
          Only show GHES supported
      </button>

      <div id="main-container">
      <div>
          <div>
            <h2>GitHub Copilot Free / Pro</h2>
          </div>
          <div id="individual-features" className="sku-grid individual">
          {
            features.individual.map(item => (
              <div 
                key={item.id} 
                data-key={item.id} 
                className={`video-box ${item.ghes_support ? 'ghes-support' : ''}`} 
                onClick={() => handleClick(item.id)}
              >
                <h3>{item.title}</h3>
                {!item.videoUrl && <div className="coming-soon-small">Video coming soon</div>}
                {item.videoUrl && <div className="play"><img src="play-button.png" className="img-play"></img></div>}
              </div>
            ))
          }
          </div>
        </div>
        <div>
          <div>
            <h2>GitHub Copilot Business</h2>
          </div>
          <div id="business-features" className="sku-grid business">
          {
            features.business.map(item => (
              <div 
                key={item.id} 
                data-key={item.id} 
                className={`video-box ${item.ghes_support ? 'ghes-support' : ''}`} 
                onClick={() => handleClick(item.id)}
              >
                <h3>{item.title}</h3>
                {!item.videoUrl && <div className="coming-soon-small">Video coming soon</div>}
                {item.videoUrl && <div className="play"><img src="play-button.png" className="img-play"></img></div>}
              </div>
            ))
          }
          </div>
        </div>
        <div>
          <div>
            <h2>GitHub Copilot Enterprise</h2>
          </div>
          <div id="enterprise-features" className="sku-grid enterprise">
          {features.enterprise.map(item => (
            <div 
              key={item.id} 
              data-key={item.id} 
              className={`video-box ${item.ghes_support ? 'ghes-support' : ''}`} 
              onClick={() => handleClick(item.id)}
            >
              <h3>{item.title}</h3>
              {!item.videoUrl && <div className="coming-soon-small">Video coming soon</div>}
              {item.videoUrl && <div className="play"><img src="play-button.png" className="img-play"></img></div>}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skus;
