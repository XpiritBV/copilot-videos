document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const tutorials = data.tutorials;
            const tutorialsList = document.getElementById('tutorials-list');

            tutorials.forEach(tutorial => {
                const tutorialElement = document.createElement('div');
                tutorialElement.className = 'tutorial-item';
                tutorialElement.innerHTML = `
                    <h3>${tutorial.title}</h3>
                    <p>${tutorial.description}</p>
                    <a href="${tutorial.url}" target="_blank">Watch Tutorial</a>
                `;
                tutorialsList.appendChild(tutorialElement);
            });
        })
        .catch(error => console.error('Error loading tutorials:', error));
});
