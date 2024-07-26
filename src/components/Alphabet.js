import React, { useState, useEffect, useRef } from 'react';
import './styles/draggable.css';
import './styles/styles.css';
import translate from "translate";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Letter from './Letter';

const Alphabet = () => {
    const { width, height } = useWindowSize()
    const [letters, setLetters] = useState([]);
    const [targetLetter, setTargetLetter] = useState('');
    const [voices, setVoices] = useState([]);
    const [spanishVoice, setSpanishVoice] = useState(null);
    const [englishVoice, setEnglishVoice] = useState(null);
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const initialLoad = useRef(true);

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
            setSpanishVoice(voices.find(voice => voice.lang.includes('es')));
        }
        else{
            setSpanishVoice(spanishVoice);

        }

        setVoicesLoaded(true);
    };


    useEffect(() => {
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        const alphabet = [];
        for (let i = 65; i < 91; i++) {
            alphabet.push(String.fromCharCode(i));
        }
        setLetters(alphabet); 
        console.log(alphabet);




    }, []);

    const handleDragStart = (e, letter) => {
        e.dataTransfer.setData('text/plain', letter);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleClick = (e, letter) => {
        e.preventDefault();
        setTargetLetter(letter);
        const synth = window.speechSynthesis;
        const utterThis = new SpeechSynthesisUtterance(letter);
        utterThis.voice = englishVoice;
        synth.speak(utterThis);

        translate(letter, { from: 'en', to: 'es' }).then((res) => {
            const utterThis = new SpeechSynthesisUtterance(res);
            utterThis.voice = spanishVoice;
            synth.speak(utterThis);
        });
    }

    return (
        <div className="alphabet">
            <center>
                <h1><u>Alphabet (WIP)</u></h1>
            </center>
            <div className="letters">
                {letters.map((letter, i) => (
                    <Letter
                        key={i}
                        letter={letter}
                        onClick={handleClick}

                    />
                ))}
            </div>
            

        </div>

    );

};

export default Alphabet;
