import React    from 'react';
import './styles/draggable.css';
import './styles/styles.css';
import pond from './assets/pond.jpg';
import {useDroppable} from '@dnd-kit/core';
 

function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'pond',
    });

    const style = {
        backgroundColor: isOver ? 'green' : undefined,
        fontWeight: 500,
        textAlign: 'center',
        lineHeight: '100px',
        width: '300px', // Set the width and height to fixed values
        height: '300px',
        backgroundImage: `url(${pond})`,
        backgroundSize: 'cover', // Ensure the image covers the div
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Ensure the image doesn't repeat
        border: "1px solid black",
    };


    return (
        
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
        
    );
    };

export default Droppable;