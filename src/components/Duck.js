import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import duck from './assets/duck40.png';


function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    border: "none",
  }

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
      <img src={duck} alt="duck" id="duck"></img>
    </button>
  );
}

export default Draggable;