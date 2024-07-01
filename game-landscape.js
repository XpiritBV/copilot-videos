document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    let levelsData = [];

    canvas.width = 800;
    canvas.height = 600;

    function loadLevels() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                levelsData = data.adventure.levels;
                drawLandscape();
            })
            .catch(error => console.error('Error loading level data:', error));
    }

    function drawLandscape() {
        ctx.fillStyle = '#1B4513';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        function drawForestBackground() {
            const treeCount = 50; // Adjust based on canvas size or desired density
            for (let i = 0; i < treeCount; i++) {
                // Randomize tree position
                const x = Math.random() * canvas.width;
                const y = Math.random() * (canvas.height - 50) + 50; // Keep trees above the bottom edge
        
                // Randomize tree size
                const trunkHeight = 50 + Math.random() * 30; // Between 20 and 40
                const trunkWidth = 10 + Math.random() * 10; // Between 10 and 20
                const leavesSize = 30 + Math.random() * 50; // Between 30 and 50
        
                // Draw trunk
                ctx.fillStyle = '#8B4513'; // Trunk color
                ctx.fillRect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight);
        
                // Draw leaves
                ctx.fillStyle = '#006400'; // Dark green for leaves
                ctx.fillRect(x - leavesSize / 2, y - trunkHeight - leavesSize / 2, leavesSize, leavesSize);
            }
        }

        drawForestBackground();

        // Function to calculate level positions
        function calculateLevelPositions(levelsData, canvas) {
            const margin = 70; // Margin from both sides
            const maxX = canvas.width - (2 * margin); // Adjust maxX to leave a margin of 70 on both sides
            const maxY = canvas.height - margin; // Reserve some space at the bottom
            const levelsPerRow = 4; // Number of levels before changing direction
            const numRows = Math.ceil(levelsData.length / levelsPerRow); // Total number of rows
            const deltaY = 1; // Additional vertical offset for each level
            // Adjust stepY to account for deltaY in the total height calculation
            const stepY = (maxY - (numRows * deltaY)) / (numRows - 1 || 1); // Correct stepY calculation

            return levelsData.map((level, index) => {
                const row = Math.floor(index / levelsPerRow); // Current row based on index
                const positionInRow = index % levelsPerRow; // Position in the current row
                const isRowEven = row % 2 === 0; // Check if the row is even
                let x;

                if (isRowEven) {
                    // Move to the right on even rows
                    x = margin + (positionInRow * (maxX / (levelsPerRow - 1)));
                } else {
                    // Move to the left on odd rows
                    x = margin + ((levelsPerRow - 1 - positionInRow) * (maxX / (levelsPerRow - 1)));
                }
                // Generate a small random variation for y position
                const randomVariation = (Math.random() - 0.5) * 60; // Random value between -10 and 10
                const baseY = margin + (row * (stepY + deltaY));
                const y = Math.min(baseY + randomVariation, maxY);

                return { x, y };
            });
        }

        // Drawing levels using calculated positions
        const levelPositions = calculateLevelPositions(levelsData, canvas);
        levelPositions.forEach((position, index) => {
            if (index > 0) { // Check if there's a previous level to draw a path from
                const prevPosition = levelPositions[index - 1];
                ctx.strokeStyle = '#FFFFFF'; // Path color
                ctx.lineWidth = 8; // Path width
                ctx.beginPath();
                ctx.moveTo(prevPosition.x + 10, prevPosition.y);

                // Calculate midpoints for more steps
                const midX1 = (prevPosition.x + position.x) / 2;
                const midY1 = (prevPosition.y + position.y) / 2;
                const midX2 = (midX1 + position.x) / 2;
                const midY2 = (midY1 + position.y) / 2;

                // Create a "stepped" path for the 8-bit style with more steps
                // Move horizontally first, then vertically, and repeat
                ctx.lineTo(midX1, prevPosition.y); // Step 1: Move to first midpoint horizontally
                ctx.lineTo(midX1, midY1); // Step 2: Move vertically to first midpoint
                ctx.lineTo(midX2, midY1); // Step 3: Move horizontally to second midpoint
                ctx.lineTo(midX2, midY2); // Step 4: Move vertically towards final position
                ctx.lineTo(position.x, midY2); // Step 5: Final horizontal move towards target x
                ctx.lineTo(position.x, position.y); // Final move to target position

                ctx.stroke();
            }

            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(position.x, position.y, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        });

        // Second loop: Draw levels and their numbers to prevent the path to overlap them
        levelPositions.forEach((position, index) => {
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(position.x, position.y, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();

            // Draw border around circle
            ctx.strokeStyle = '#FF0000'; // Border color
            ctx.lineWidth = 3; // Border width
            ctx.beginPath();
            ctx.arc(position.x, position.y, 20, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();

            // Draw level number
            ctx.fillStyle = '#000000';
            ctx.font = '16px Calibri';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(index + 1, position.x, position.y);
        });
        // Click detection using calculated positions
        canvas.addEventListener('click', function(event) {
            levelPositions.forEach((position, index) => {
                if (Math.sqrt((event.offsetX - position.x) ** 2 + (event.offsetY - position.y) ** 2) < 20) {
                    displayLevelInfo(index);
                }
            });
        });

        // Assuming you have loaded the JSON data into a variable named `data`
        canvas.addEventListener('mousemove', function(event) {
            let cursorChanged = false;
            for (let index = 0; index < levelPositions.length; index++) {
                const position = levelPositions[index];
                if (Math.sqrt((event.offsetX - position.x) ** 2 + (event.offsetY - position.y) ** 2) < 20) {
                    canvas.style.cursor = 'pointer';
                    cursorChanged = true;
                    // Show the title from adventure.levels
                    // log the level info
                    console.log(JSON.stringify(levelsData[index]));
                    const title = levelsData[index].title; // Ensure index matches between levelPositions and adventure.levels
                    // Example: Update an element's text to show the title
                    const tooltip = document.getElementById('tooltip');
                    tooltip.style.left = event.pageX + 'px';
                    tooltip.style.top = (event.pageY - 35) + 'px';
                    tooltip.style.display = 'block';
                    document.getElementById('tooltip').textContent = title;
                    break; // Exit loop once cursor change is applied
                }
            }
            if (!cursorChanged) {
                canvas.style.cursor = 'default';
                document.getElementById('tooltip').textContent = ''; // Hide the tooltip when not hovering over a level
                document.getElementById('tooltip').style.display = 'none';
            }
        });
    }

    function displayLevelInfo(levelIndex) {
        // Redirect to game-level.html with the level index as a query parameter
        window.location.href = `game-level.html?level=${levelIndex+1}`;
    }

    loadLevels();
});

