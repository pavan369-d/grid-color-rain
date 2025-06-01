import React, { useEffect, useRef, useState } from 'react'

const GridRain = ({rows,columns}) => {
    const [grid,setGrid] = useState([]);
    const animationRef = useRef();

    const getRandomColor = () =>{
        const colors = ['#000','#00f','#0f0','#f00','#f0f','#ff0','#0ff','#fff'];
        return colors[Math.floor(Math.random()*colors.length)];
    }
 const initGrid = () =>
    Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => null)
    );
    const updateGrid = () => {
    setGrid((prevGrid) => {
      const newGrid = initGrid();

     
      for (let r = rows - 1; r > 0; r--) {
        for (let c = 0; c < columns; c++) {
          newGrid[r][c] = prevGrid[r - 1][c];
        }
      }

      
      for (let c = 0; c < columns; c++) {
        newGrid[0][c] = Math.random() < 0.3 ? getRandomColor() : null;
      }

      return newGrid;
    });

    animationRef.current = requestAnimationFrame(updateGrid);
  };

  useEffect(()=>{
    setGrid(initGrid());
    animationRef.current = requestAnimationFrame(updateGrid);
    return () => cancelAnimationFrame(animationRef.current);
  },[])
  
  return (
    <div className='grid-rain-container' style={{gridTemplateColumns:`repeat(${columns},1fr)`,gridTemplateRows:`repeat(${rows},1fr)`}}>
      {grid.flat().map((color,index)=>(
        <div key={index} className='grid-cell' style={{backgroundColor:color || '#000'}}></div>
      ))}
    </div>
  )
}

export default GridRain
