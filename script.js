document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const businessFeatures = document.getElementById('business-features');
            const enterpriseFeatures = document.getElementById('enterprise-features');

            data.features.forEach(feature => {
                const featureGrid = document.createElement('div');
                featureGrid.className = 'feature-grid'; 

                // Create a new element for the SKU name
                const skuName = document.createElement('h2');
                skuName.textContent = feature.sku;
                featureGrid.appendChild(skuName);

                feature.items.forEach(item => {
                    const featureBox = document.createElement('div');
                    featureBox.className = 'video-box';
                    featureBox.innerHTML = `<h3>${item.title}</h3>`;
                    featureBox.addEventListener('click', () => {
                        window.location.href = `detail.html?title=${encodeURIComponent(item.title)}&videoUrl=${encodeURIComponent(item.videoUrl)}&description=${encodeURIComponent(item.description)}`;
                    });
                    featureGrid.appendChild(featureBox);
                });
                if (feature.sku === "GitHub Copilot Business") {
                    businessFeatures.appendChild(featureGrid);
                } else if (feature.sku === "GitHub Copilot Enterprise") {
                    enterpriseFeatures.appendChild(featureGrid);
                }
            });
        })
        .catch(error => console.error('Error loading the data:', error));
});