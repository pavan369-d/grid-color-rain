import React, { useEffect, useRef, useState } from 'react';

const GridRain = ({ rows, columns }) => {
  const [grid, setGrid] = useState([]);
  const animationRef = useRef();

  const colors = [
    '#FF0000', // bright red
    '#00FF00', // bright green
    '#0000FF', // bright blue
    '#FFFF00', // bright yellow
    '#FF00FF', // magenta
    '#00FFFF', // cyan
    '#FFA500', // orange
    '#FFFFFF', // white
    '#00FF7F', // spring green
  ];

  // Store current color for even and odd columns separately
  const evenColorRef = useRef(null);
  const oddColorRef = useRef(null);

  // Initialize colors and update every 5 seconds
  useEffect(() => {
    const pickRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

    // Initialize colors
    evenColorRef.current = pickRandomColor();
    oddColorRef.current = pickRandomColor();

    const interval = setInterval(() => {
      evenColorRef.current = pickRandomColor();
      oddColorRef.current = pickRandomColor();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const initGrid = () =>
    Array.from({ length: rows }, () => Array.from({ length: columns }, () => null));

  const updateGrid = () => {
    setGrid((prevGrid) => {
      const newGrid = initGrid();

      // Shift colors down by one row
      for (let r = rows - 1; r > 0; r--) {
        for (let c = 0; c < columns; c++) {
          newGrid[r][c] = prevGrid[r - 1][c];
        }
      }

      // Top row: randomly decide to add color or null
      for (let c = 0; c < columns; c++) {
        const chance = Math.random();
        if (chance < 0.3) {
          // Use even or odd column color
          newGrid[0][c] = c % 2 === 0 ? evenColorRef.current :null;
        } else {
          newGrid[0][c] = null;
        }
      }

      return newGrid;
    });

    animationRef.current = requestAnimationFrame(updateGrid);
  };

  useEffect(() => {
    setGrid(initGrid());
    animationRef.current = requestAnimationFrame(updateGrid);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div
      className="grid-rain-container"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        display: 'grid',
        gap: '5px',
        
      }}
    >
      {grid.flat().map((color, idx) => (
        <div
          key={idx}
          className="grid-cell"
          style={{
            backgroundColor: color || '#000',
            width: '100%',
            height: '100%',
            transition: 'background-color 0.3s',
          }}
        ></div>
      ))}
    </div>
  );
};

export default GridRain;
