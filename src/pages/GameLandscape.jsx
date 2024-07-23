import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import getData from '../utils/getData';

const GameLandscape = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let levelsData = [];

    function adjustCanvasSize() {
      if (window.innerWidth <= 820) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 135;
      } else {
        canvas.width = 800;
        canvas.height = 600;
      }
    }

    adjustCanvasSize();
    window.addEventListener('resize', adjustCanvasSize);

    function loadLevels() {
      getData()
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
        const treeCount = 50;
        for (let i = 0; i < treeCount; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * (canvas.height - 50) + 50;
          const trunkHeight = 50 + Math.random() * 30;
          const trunkWidth = 10 + Math.random() * 10;
          const leavesSize = 30 + Math.random() * 50;

          ctx.fillStyle = '#8B4513';
          ctx.fillRect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight);

          ctx.fillStyle = '#006400';
          ctx.fillRect(x - leavesSize / 2, y - trunkHeight - leavesSize / 2, leavesSize, leavesSize);
        }
      }

      drawForestBackground();

      function calculateLevelPositions(levelsData, canvas) {
        const margin = 70;
        const maxX = canvas.width - (2 * margin);
        const maxY = canvas.height - margin;
        const levelsPerRow = window.innerWidth <= 820 ? 2 : 4;
        const numRows = Math.ceil(levelsData.length / levelsPerRow);
        const deltaY = 1;
        const stepY = (maxY - (numRows * deltaY)) / (numRows - 1 || 1);

        return levelsData.map((level, index) => {
          const row = Math.floor(index / levelsPerRow);
          const positionInRow = index % levelsPerRow;
          const isRowEven = row % 2 === 0;
          let x;

          if (isRowEven) {
            x = margin + (positionInRow * (maxX / (levelsPerRow - 1)));
          } else {
            x = margin + ((levelsPerRow - 1 - positionInRow) * (maxX / (levelsPerRow - 1)));
          }

          const randomVariation = (Math.random() - 0.5) * 60;
          const baseY = margin + (row * (stepY + deltaY));
          const y = Math.min(baseY + randomVariation, maxY);

          return { x, y };
        });
      }

      const levelPositions = calculateLevelPositions(levelsData, canvas);
      levelPositions.forEach((position, index) => {
        if (index > 0) {
          const prevPosition = levelPositions[index - 1];
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 8;
          ctx.beginPath();
          ctx.moveTo(prevPosition.x + 10, prevPosition.y);

          const midX1 = (prevPosition.x + position.x) / 2;
          const midY1 = (prevPosition.y + position.y) / 2;
          const midX2 = (midX1 + position.x) / 2;
          const midY2 = (midY1 + position.y) / 2;

          ctx.lineTo(midX1, prevPosition.y);
          ctx.lineTo(midX1, midY1);
          ctx.lineTo(midX2, midY1);
          ctx.lineTo(midX2, midY2);
          ctx.lineTo(position.x, midY2);
          ctx.lineTo(position.x, position.y);

          ctx.stroke();
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(position.x, position.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });

      levelPositions.forEach((position, index) => {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(position.x, position.y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(position.x, position.y, 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = '#000000';
        ctx.font = '16px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(index + 1, position.x, position.y);
      });

      canvas.addEventListener('click', function(event) {
        levelPositions.forEach((position, index) => {
          if (Math.sqrt((event.offsetX - position.x) ** 2 + (event.offsetY - position.y) ** 2) < 20) {
            displayLevelInfo(index);
          }
        });
      });

      canvas.addEventListener('mousemove', function(event) {
        let cursorChanged = false;
        for (let index = 0; index < levelPositions.length; index++) {
          const position = levelPositions[index];
          if (Math.sqrt((event.offsetX - position.x) ** 2 + (event.offsetY - position.y) ** 2) < 20) {
            canvas.style.cursor = 'pointer';
            cursorChanged = true;
            const title = levelsData[index].title;
            const tooltip = document.getElementById('tooltip');
            tooltip.style.left = event.pageX + 'px';
            tooltip.style.top = (event.pageY - 35) + 'px';
            tooltip.style.display = 'block';
            tooltip.style.color = '#000000';
            tooltip.style.fontWeight = 'bold';
            tooltip.style.fontSize = '24px';
            document.getElementById('tooltip').textContent = title;
            break;
          }
        }

        if (!cursorChanged) {
          canvas.style.cursor = 'default';
          document.getElementById('tooltip').textContent = '';
          document.getElementById('tooltip').style.display = 'none';
        }
      });
    }

    function displayLevelInfo(levelIndex) {
      window.location.href = `/game-level?level=${levelIndex + 1}`;
    }

    loadLevels();
    window.addEventListener('resize', function() {
      adjustCanvasSize();
      drawLandscape();
    });
  }, []);

  return (    
    <div>
      <Link to="/" className="back-button">Back to Home</Link>
      <div id="game-container">        
        <div id="title-frame">Levels of Enlightenment</div>
        <canvas id="game-canvas" ref={canvasRef}></canvas>
        <div id="tooltip" style={{ display: 'none' }}>Tooltip Text</div>
      </div>
    </div>
  );
};

export default GameLandscape;
