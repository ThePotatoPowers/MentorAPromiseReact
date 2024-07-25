import React, { useState, useEffect, useRef } from 'react';
import './styles/draggable.css';
import './styles/styles.css';
import incorrect from './assets/incorrect.svg';
import correct from './assets/check.svg';
import Duck from './Duck';
import pond from './assets/pond.jpg';
import translate from "translate";
import nest from './assets/nest.png';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Counting2 = () => {
    const { width, height } = useWindowSize()

    const [ducks, setDucks] = useState([]);
    const [pondDucks, setPondDucks] = useState([]);
    const [nestDucks, setNestDucks] = useState([]);
    const [targetNumber, setTargetNumber] = useState(0);
    const [nestTarget, setNestTarget] = useState(0);

    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const initialLoad = useRef(true);

    const randRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const loadVoices = () => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        setVoices(voices);
        const spanishVoice = voices.find(voice => voice.lang.includes('es'));
        setSelectedVoice(spanishVoice);
        setVoicesLoaded(true);
    };

    useEffect(() => {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        const numInitialDucks = randRange(1, 10);
        const initialDucks = [...Array(numInitialDucks).keys()].map(i => ({ id: i }));
        const target = randRange(1, numInitialDucks - 1);
        const nestTarget = randRange(1, numInitialDucks - target);

        setTargetNumber(target);
        setNestTarget(nestTarget);
        setDucks(initialDucks);
    }, []);

    function sayPond() {
        const synth = window.speechSynthesis;
        let speech = new SpeechSynthesisUtterance(`Get ${targetNumber} ducks in the pond`);
        synth.speak(speech);

        translate(`Get ${targetNumber} ducks in the pond`, { from: "en", to: "es" }).then(text => {
            speech = new SpeechSynthesisUtterance(text);
            if (selectedVoice) {
                speech.voice = selectedVoice;
            }
            synth.speak(speech);
        });
    }

    function sayNest() {
        const synth = window.speechSynthesis;
        let speech = new SpeechSynthesisUtterance(`Get ${nestTarget} ducks in the nest`);
        synth.speak(speech);
        translate(`Get ${nestTarget} ducks in the nest`, { from: "en", to: "es" }).then(text => {
            speech = new SpeechSynthesisUtterance(text);
            if (selectedVoice) {
                speech.voice = selectedVoice;
            }
            synth.speak(speech);
        });
    }

    useEffect(() => {
        if (!voicesLoaded || initialLoad.current) {
            return;
        }

        if (pondDucks.length === 0 && nestDucks.length === 0) {
            return;
        }

        console.log(`There are ${pondDucks.length} ducks in the pond and ${nestDucks.length} in the nest`);

        const synth = window.speechSynthesis;
        let speech = new SpeechSynthesisUtterance(`There are ${pondDucks.length} ducks in the pond and ${nestDucks.length} in the nest`);
        synth.speak(speech);

        translate(`There are ${pondDucks.length} ducks in the pond and ${nestDucks.length} in the nest`, { from: "en", to: "es" }).then(text => {
            speech = new SpeechSynthesisUtterance(text);
            if (selectedVoice) {
                speech.voice = selectedVoice;
            }
            synth.speak(speech);
        });
    }, [pondDucks, nestDucks, voicesLoaded, selectedVoice]);

    useEffect(() => {
        if (initialLoad.current) {
            initialLoad.current = false;
        }
    }, [voicesLoaded]);

    const handleDragStart = (event, id, location) => {
        event.dataTransfer.setData('type', 'duck');
        event.dataTransfer.setData('id', id);
        event.dataTransfer.setData('location', location);
    };

    const handleOnDrop = (event) => {
        const dropZone = event.target;
        const id = parseInt(event.dataTransfer.getData('id'));

        if (dropZone.id === 'pondImg') {
            const original = event.dataTransfer.getData('location');
            if (original === 'pond') return;

            if (original === 'nest') {
                const newNestDucks = nestDucks.filter(duck => duck.id !== id);
                const droppedDuck = nestDucks.find(duck => duck.id === id);
                setNestDucks(newNestDucks);
                setPondDucks([...pondDucks, droppedDuck]);
            } else {
                const newDucks = ducks.filter(duck => duck.id !== id);
                const droppedDuck = ducks.find(duck => duck.id === id);
                setDucks(newDucks);
                setPondDucks([...pondDucks, droppedDuck]);
            }
        } else if (dropZone.id === 'nestImg') {
            const original = event.dataTransfer.getData('location');
            if (original === 'nest') return;

            if (original === 'pond') {
                const newPondDucks = pondDucks.filter(duck => duck.id !== id);
                const droppedDuck = pondDucks.find(duck => duck.id === id);
                setPondDucks(newPondDucks);
                setNestDucks([...nestDucks, droppedDuck]);
            } else {
                const newDucks = ducks.filter(duck => duck.id !== id);
                const droppedDuck = ducks.find(duck => duck.id === id);
                setDucks(newDucks);
                setNestDucks([...nestDucks, droppedDuck]);
            }
        } else if (dropZone.className === 'ducks') {
            const newPondDucks = pondDucks.filter(duck => duck.id !== id);
            const newNestDucks = nestDucks.filter(duck => duck.id !== id);

            const original = event.dataTransfer.getData('location');
            const droppedDuck1 = pondDucks.find(duck => duck.id === id);
            const droppedDuck2 = nestDucks.find(duck => duck.id === id);

            if (original === 'pond') {
                setDucks([...ducks, droppedDuck1]);
            } else if (original === 'nest') {
                setDucks([...ducks, droppedDuck2]);
            } else {
                return;
            }
            setPondDucks(newPondDucks);
            setNestDucks(newNestDucks);
        }
    };

    const handleOnDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="counting">
            <h1>Count the Ducks (Level 2)</h1>

            <div className="ducks" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
                {ducks.map(duck => (
                    <Duck key={duck.id} id={duck.id} handleDragStart={(event, id) => handleDragStart(event, id, 'ducks')} />
                ))}
            </div>

            <div className='dropZones'>
                <div className='pond' onDrop={handleOnDrop} onDragOver={handleOnDragOver} draggable='false'>
                    {pondDucks.map((duck, index) => (
                        <Duck
                            key={duck.id}
                            id={duck.id}
                            handleDragStart={(event, id) => handleDragStart(event, id, 'pond')}
                            style={{ zIndex: index }}
                        />
                    ))}
                    <img id="pondImg" src={pond} alt="pond" draggable="false" />
                </div>

                <div className='nest' onDrop={handleOnDrop} onDragOver={handleOnDragOver} draggable='false'>
                    {nestDucks.map((duck, index) => (
                        <Duck
                            key={duck.id}
                            id={duck.id}
                            handleDragStart={(event, id) => handleDragStart(event, id, 'nest')}
                            style={{ zIndex: index }}
                        />
                    ))}
                    <img id="nestImg" src={nest} alt="nest" draggable="false" />
                </div>
            </div>

            <div className="check">
                {(pondDucks.length === targetNumber && nestDucks.length === nestTarget) ? (
                    <div>
                        
                    <button onClick={() => window.location.reload()}>
                        <img src={correct} alt="correct" />
                    </button>
                    <Confetti width={width} height={height} />
                    </div>
                ) : (
                    <img src={incorrect} alt="incorrect" />
                )}
                
            </div>

            <center>
                <div className="targetTexts">
                <button id="pondTargetText" onClick={() => sayPond()}>
                    <h3>Get {targetNumber} ducks in the pond</h3>
                    <h3>Consigue {targetNumber} patos en el estanque </h3>
                </button>

                
                <button id="nestTargetText" onClick={() => sayNest()}>
                    <h3>Get {nestTarget} ducks in the nest</h3>
                    <h3>Consigue {targetNumber} patos en el nido</h3>
                </button>

            </div>
            </center>
            
        </div>
    );
};

export default Counting2;
