const fs = require('fs');
const path = require('path');

// Load the data.json file
const dataFilePath = path.join(__dirname, '..', '..',  'public', 'data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// Check for duplicate IDs
const idMap = new Map();
const duplicates = [];

// keep track of the highest ID
let highestId = -1;

data.features.videos.forEach((videos, index) => {
    console.log(`Checking for duplicates in SKU: ${videos.sku}`);
    const sku = videos.sku;	    
    videos.items.forEach((video, index) => {
        if (idMap.has(video.id)) {
            duplicates.push({
                id: video.id,
                title: video.title,
                sku: sku,
                location: `Index: ${index}`
            });
            // also mark the original as duplicate
            let original = idMap.get(video.id);
            original.id = video.id;
            // get the sku from the originals parent
            original.sku = videos.sku;
            duplicates.push(original);
        } else {
            idMap.set(video.id, {
                title: video.title,
                location: `Index: ${index}`
            });
        }

        // Update the highest ID if the current video's ID is greater
        if (video.id > highestId) {
            highestId = video.id;
        }
    });
}); 

// Write duplicates to GITHUB_STEP_SUMMARY
if (duplicates.length > 0) {
  let summaryFilePath;
  if (process.env.GITHUB_STEP_SUMMARY) {
    summaryFilePath = process.env.GITHUB_STEP_SUMMARY;
  }
  else {
    summaryFilePath = path.join(__dirname, '..', '..', 'duplicate-ids-summary.txt');
  }
  console.log(`Writing duplicate IDs to [${summaryFilePath}]`);
  let summaryContent = duplicates.map(dup => `ID: ${dup.id}, Title: ${dup.title}, Location: ${dup.location}, SKU: ${dup.sku}`).join('\n');
  // also report the highest ID
  summaryContent += `\nHighest ID: [${highestId}]`;
  
  fs.writeFileSync(summaryFilePath, summaryContent, 'utf8');
  console.log('Duplicate IDs found and reported.');
  console.log(`Highest ID: [${highestId}]`);
} else {
  console.log('No duplicate IDs found.');
  
  // Log the highest ID
  console.log(`Highest ID: [${highestId}]`);
}