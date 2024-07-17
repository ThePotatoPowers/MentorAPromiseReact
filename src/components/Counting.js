import React, {useState}    from 'react';
import './styles/draggable.css';
import './styles/styles.css';
import incorrect from './assets/incorrect.svg';
import correct from './assets/check.svg';
import Draggable from './Duck';
import Droppable from './Pond';
import {DndContext} from '@dnd-kit/core';

function Counting() {

    const [isDropped, setIsDropped] = useState(false);
    const draggableMarkup = (
        <Draggable/>
    );
    

    return (
        <div className="draggableBody">
            <center>
                <h1 id="countTitle">Counting Drag</h1>

                <DndContext onDragEnd={handleDragEnd}>
                    {!isDropped ? draggableMarkup : null}
                    <Droppable>
                        {isDropped ? draggableMarkup : ''}
                    </Droppable>
                    
                </DndContext>    

        
                <p>Count: <span id="countB">0</span></p>

                <br/>
                <h3>Drag three ducks to box B</h3>
                <br/>
                <img src={incorrect} alt="incorrect" id="check"/>
                <img src={correct} alt="correct" id="check2"/>
            
            
            </center>



        </div>
    );

    function handleDragEnd(event) {
        if (event.over && event.over.id === 'pond') {
            setIsDropped(true);
            console.log("here!");
        }
    }

    };

export default Counting;