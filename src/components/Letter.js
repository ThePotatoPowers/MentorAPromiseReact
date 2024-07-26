import React from 'react';
import './styles/styles.css';


const Letter = ({ letter, handleDragStart }) => {


  return (
    <h2
      className='letter' 
      draggable='true' 
      onDragStart={(e) => handleDragStart(e, letter)} 
      alt="letter" 
      >
        {letter.toUpperCase()}

      </h2>

  );

}


export default Letter;