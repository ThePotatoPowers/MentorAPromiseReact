import React, { useState, useEffect, useRef } from 'react';
import './styles/draggable.css';
import './styles/styles.css';
import incorrect from './assets/incorrect.svg';
import correct from './assets/check.svg';
import Duck from './Duck';
import pond from './assets/pond.jpg';
import translate from "translate";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Counting = () => {
    const { width, height } = useWindowSize()
    const [ducks, setDucks] = useState([]);
    const [pondDucks, setPondDucks] = useState([]);
    const [targetNumber, setTargetNumber] = useState(0);

    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [englishVoice, setEnglishVoice] = useState(null);
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const initialLoad = useRef(true);

    const randRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const loadVoices = () => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        setVoices(voices);
        
        const english = voices.find(voice => voice.name.includes('Google US English'));
        if (!english) {
            setEnglishVoice(voices.find(voice => voice.lang.includes('en')));
        }
        else {
            setEnglishVoice(english);

        }

        const spanishVoice = voices.find(voice => voice.name.includes('Google español'));
        if (!spanishVoice) {
            setSelectedVoice(voices.find(voice => voice.lang.includes('es')));
        }
        else{
            setSelectedVoice(spanishVoice);

        }

        setVoicesLoaded(true);
    };

    function sayPond() {
        const synth = window.speechSynthesis;
        let speech = new SpeechSynthesisUtterance(`Get ${targetNumber} ducks in the pond`);
        if (englishVoice) {
            speech.voice = englishVoice;
        }
        synth.speak(speech);

        translate(`Get ${targetNumber} ducks in the pond`, { from: "en", to: "es" }).then(text => {
            speech = new SpeechSynthesisUtterance(text);
            if (selectedVoice) {
                speech.voice = selectedVoice;
            }
            synth.speak(speech);
        });
    }

    useEffect(() => {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        const numInitialDucks = randRange(1, 10);
        const initialDucks = [...Array(numInitialDucks).keys()].map(i => ({ id: i }));
        const target = randRange(1, numInitialDucks);

        setTargetNumber(target);
        setDucks(initialDucks);
    }, []);

    useEffect(() => {
        if (!voicesLoaded || initialLoad.current) {
            return;
        }

        if (pondDucks.length === 0) {
            return;
        }

        console.log(`There are ${pondDucks.length} ducks in the pond`);

        const synth = window.speechSynthesis;
        let speech = new SpeechSynthesisUtterance(`There are ${pondDucks.length} ducks in the pond`);
        if (englishVoice) {
            speech.voice = englishVoice;
        }
        synth.speak(speech);

        translate(`There are ${pondDucks.length} ducks in the pond`, { from: "en", to: "es" }).then(text => {
            speech = new SpeechSynthesisUtterance(text);
            if (selectedVoice) {
                speech.voice = selectedVoice;
            }
            synth.speak(speech);
        });
    }, [pondDucks, voicesLoaded, selectedVoice]);

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

            const newDucks = ducks.filter(duck => duck.id !== id);
            const droppedDuck = ducks.find(duck => duck.id === id);
            setDucks(newDucks);
            setPondDucks([...pondDucks, droppedDuck]);
        } else if (dropZone.className === 'ducks') {
            const newPondDucks = pondDucks.filter(duck => duck.id !== id);
            const original = event.dataTransfer.getData('location');
            const droppedDuck = pondDucks.find(duck => duck.id === id);

            if (original === 'pond') {
                setDucks([...ducks, droppedDuck]);
            }
            setPondDucks(newPondDucks);
        }
    };

    const handleOnDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="counting">
            <h1>Count the Ducks (Level 1)</h1>

            <div className="ducks" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
                {ducks.map(duck => (
                    <Duck  id={duck.id} handleDragStart={(event, id) => handleDragStart(event, id, 'ducks')} />
                ))}
            </div>
            
            <center>

            
            <div className='pond' id="countingPond" onDrop={handleOnDrop} onDragOver={handleOnDragOver} draggable='false'>
                {pondDucks.map((duck, index) => (
                    <Duck
                        id={duck.id}
                        handleDragStart={(event, id) => handleDragStart(event, id, 'pond')}
                        style={{ zIndex: index }}
                    />
                ))}
                <img id="pondImg" src={pond} alt="pond" draggable="false" />
            </div>
            </center>
            
            <div className="check">
                {pondDucks.length === targetNumber ? (
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


            </div>
            </center>

        </div>
    );
};

export default Counting;
