import React, {useState, useEffect}    from 'react';
import './styles/draggable.css';
import './styles/styles.css';
import incorrect from './assets/incorrect.svg';
import correct from './assets/check.svg';
import Duck from './Duck';
import pond from './assets/pond.jpg';
import translate from "translate";
import nest from './assets/nest.png';


const Counting = () => {
    const [ducks, setDucks] = useState([]);
    const [pondDucks, setPondDucks] = useState([]);
    const [nestDucks, setNestDucks] = useState([]);
    const [targetNumber, setTargetNumber] = useState(0);


    const randRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };


    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);

    useEffect(() => {
        // Load available 
        
        const loadVoices = (spoken) => {
            const synth = window.speechSynthesis;
            const voices = synth.getVoices();
            setVoices(voices);
            // Set a Spanish voice if available
            const englishVoice = voices.find(voice => voice.lang.includes('en'));
            const spanishVoice = voices.find(voice => voice.lang.includes('es'));
            setSelectedVoice(spanishVoice);
        };

        loadVoices();
        // Voices might load asynchronously
        window.speechSynthesis.onvoiceschanged = loadVoices;
    

    const numInitialDucks = randRange(1, 10);
    const initialDucks = [
        ...Array(numInitialDucks).keys()
    ].map(i => ({ id: i }));

    const target = randRange(1, numInitialDucks);
    setTargetNumber(target);
    setDucks(initialDucks);

    }, []);

    useEffect(() => {

        console.log(`There are ${pondDucks.length} ducks in the pond`);

        const synth = window.speechSynthesis;
        let speech = new SpeechSynthesisUtterance(`There are ${pondDucks.length} ducks in the pond`);
        synth.speak(speech);

        translate(`There are ${pondDucks.length} ducks in the pond`, { from: "en", to: "es" }).then(text => {
            speech = new SpeechSynthesisUtterance(text);
            if (selectedVoice) {
                speech.voice = selectedVoice;
            }
            synth.speak(speech);
        });
    }, [pondDucks, selectedVoice]);


    const handleDragStart = (event, id) => {
        event.dataTransfer.setData('type', 'duck');
        event.dataTransfer.setData('id', id);
    }
    
    function handleOnDrop(event) {
        const type = event.dataTransfer.getData('type');
        // get type of pond
        const dropZone = event.target;
        console.log(dropZone);
        console.log(dropZone.className);
        

        const id = parseInt(event.dataTransfer.getData('id'));
        if (dropZone.id === 'pondImg') {

            console.log('Duck dropped in pond');
            const newDucks = ducks.filter(duck => duck.id !== id);
            const droppedDuck = ducks.find(duck => duck.id === id);
            setDucks(newDucks);
            setPondDucks([...pondDucks, droppedDuck]);


        }
        else if (dropZone.id === 'nestImg') {
            console.log('Duck dropped in nest');
            const newNestDucks = ducks.filter(duck => duck.id !== id);
            const droppedDuck = ducks.find(duck => duck.id === id);
            setDucks(newNestDucks);
            setNestDucks([...nestDucks, droppedDuck]);
        }



        if (dropZone.className === 'ducks') {
            console.log('Duck dropped in ducks');
            const newPondDucks = pondDucks.filter(duck => duck.id !== id);
            const droppedDuck = pondDucks.find(duck => duck.id === id);
            setPondDucks(newPondDucks);
            setDucks([...ducks, droppedDuck]);
        }
            

           
                
        }
    

    function handleOnDragOver(event) {
        event.preventDefault();
    }

    

    return(
    <div className="counting">
        <h1>Count the Ducks (Level 2)</h1>

        <div className="ducks"
                onDrop={handleOnDrop}
                onDragOver={handleOnDragOver}
            >
            {ducks.map(duck => (
                    <Duck key={duck.id} id={duck.id} handleDragStart={handleDragStart} />
                ))}

        </div>

        <div className='pond'
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
        
        >
            {pondDucks.map((duck, index) => (
                <Duck 
                    key={duck.id} 
                    id={duck.id} 
                    handleDragStart={handleDragStart} 
                    style={{ zIndex: index }}
                />
            ))}
            <img id="pondImg" src={pond} alt="pond" />
            
        </div>

        <div className='nest'
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
        
        >
            {nestDucks.map((duck, index) => (
                <Duck 
                    key={duck.id} 
                    id={duck.id} 
                    handleDragStart={handleDragStart} 
                    style={{ zIndex: index }}
                />
            ))}
            <img id="nestImg" src={nest} alt="nest" />
            
        </div>


        <div className="check">
            {pondDucks.length === targetNumber ? (
                <button onClick={() => window.location.reload()}>
                    <img src={correct} alt="correct" />
                </button>
            ) : (
                <img src={incorrect} alt="incorrect" />
            )}
            <h3>Get {targetNumber} ducks in the pond</h3>
        </div>

    </div>  
    );

    };

export default Counting;