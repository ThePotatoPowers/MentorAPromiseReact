import React from 'react';
import './styles/styles.css';


const Letter = ({ letter, onClick }) => {


  return (
    <h2
      className='letter' 
      draggable='true' 
      onClick={(e) => onClick(e, letter)}
      alt="letter" 
      >
        {letter.toUpperCase()}

      </h2>

  );

}


export default Letter;