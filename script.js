document.addEventListener('DOMContentLoaded', function() {
    // Leave the eventlistener and the RSS retrieval code in the file
    const newsContainer = document.createElement('div');
    newsContainer.className = 'news-container';
    newsContainer.id = 'news-container';
    document.body.appendChild(newsContainer);

    // Dynamically generate filter buttons for each RSS feed
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const filterButtonsContainer = document.getElementById('filter-buttons');
            const feedCounts = {}; // Store the count of posts for each feed
            data.rssFeeds.feeds.forEach(feed => {
                feedCounts[feed.name] = 0; // Initialize count for each feed
                const button = document.createElement('button');
                button.textContent = feed.name;
                button.className = 'filter-btn';
                button.setAttribute('data-feed-name', feed.name); // Add a data attribute to store the exact feed name
                button.addEventListener('click', function() {
                    filterNews(feed.name, this);
                });
                filterButtonsContainer.appendChild(button);
            });

            // Add an 'all' category button
            const allButton = document.createElement('button');
            allButton.textContent = 'All';
            allButton.className = 'filter-btn';
            allButton.addEventListener('click', function() {
                unselectFiltersAndShowAll();
            });
            filterButtonsContainer.prepend(allButton);

            // Function to unselect any active filter and show all RSS items
            function unselectFiltersAndShowAll() {
                document.querySelectorAll('.news-item').forEach(item => {
                    item.style.display = '';
                });
                document.querySelectorAll('.filter-btn').forEach(button => {
                    button.classList.remove('active');
                });
            }

            // Function to filter news items based on the selected feed
            function filterNews(feedName, clickedButton) {
                const newsItems = document.querySelectorAll('.news-item');
                const isActive = clickedButton.classList.contains('active');
                // Toggle active class on clicked button
                clickedButton.classList.toggle('active');
                if (isActive) {
                    // If the button was already active, display all news items
                    newsItems.forEach(item => {
                        item.style.display = '';
                    });
                } else {
                    // Filter news items based on the selected feed
                    newsItems.forEach(item => {
                        if (item.querySelector('span').textContent === feedName) {
                            item.style.display = '';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
                // Ensure only the clicked button can be active at a time
                document.querySelectorAll('.filter-btn').forEach(button => {
                    if (button !== clickedButton) {
                        button.classList.remove('active');
                    }
                });
            }

            // New function to aggregate all configured RSS feeds into a single feed
            async function aggregateRSSFeeds() {
                const aggregatedFeed = [];
                for (const feed of data.rssFeeds.feeds) {
                    const response = await fetch(feed.url);
                    const text = await response.text();
                    const xml = new window.DOMParser().parseFromString(text, "text/xml");
                    const items = xml.querySelectorAll("item");
                    items.forEach(item => {
                        const title = item.querySelector("title").textContent;
                        const description = item.querySelector("description").textContent;
                        const pubDate = new Date(item.querySelector("pubDate").textContent);
                        aggregatedFeed.push({ title, description, pubDate });
                    });
                }
                // Sort the aggregated feed items by their publish dates
                aggregatedFeed.sort((a, b) => b.pubDate - a.pubDate);
                return aggregatedFeed;
            }

            // Fetch and display aggregated RSS feeds
            aggregateRSSFeeds().then(aggregatedFeed => {
                aggregatedFeed.forEach(feedItem => {
                    const newsItem = document.createElement('div');
                    newsItem.className = 'news-item';
                    const formattedDate = feedItem.pubDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
                    newsItem.innerHTML = `<h4>${feedItem.title}</h4><p>${feedItem.description}</p><span>Aggregated Feed</span> <span class="date">Published: ${formattedDate}</span>`;
                    newsContainer.appendChild(newsItem);
                });
            });
        })
        .catch(error => console.error('Error loading the data:', error));
});
