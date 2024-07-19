import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import duck from './assets/duck40.png';
import './styles/styles.css';


const Duck = ({ id, handleDragStart }) => {


  return (
    <img 
      className='duck' 
      draggable='true' 
      onDragStart={(e) => handleDragStart(e, id)} 
      src={duck} 
      alt="duck" 
      />

  );

}


export default Duck;