import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AudioTest = () => {
  const [currentSound, setCurrentSound] = useState(null);

  const sounds = [
    { id: 1, name: 'Premium', src: '/sounds/sound1.mp3' },
    { id: 2, name: 'Gaming', src: '/sounds/sound2.mp3' },
    { id: 3, name: 'Budget', src: '/sounds/sound3.mp3' },
  ];

  const playSound = (sound) => {
    if (currentSound) {
      currentSound.pause();
    }
    const audio = new Audio(sound.src);
    audio.play();
    setCurrentSound(audio);
  };

  useEffect(() => {
    if (sounds.length > 0) {
      playSound(sounds[0]); // Play the first sound on mount
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Disable arrows
  };

  return (
    <div className="audio-test" style={{ padding: '20px', textAlign: 'center', backgroundColor: '#121212', color: '#ffffff', minHeight: '50vh', margin: '0' }}>
      <h2 style={{ paddingTop:'15px' ,marginBottom: '20px', fontSize: '2.5em', fontWeight: 'bold', color: '#ff0000' }}>Sound Quality Test</h2>
      <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>India's only headphones seller with sound quality check</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {sounds.map((sound) => (
          <div key={sound.id} className="sound-section" style={{ flex: '1 1 30%', maxWidth: '300px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', margin: '10px', backgroundColor: '#f5f5f5', color: '#000000', borderRadius: '10px' }}>
            <h3 style={{ fontSize: '1.8em', fontWeight: 'bold', color: '#ff0000' }}>{sound.name}</h3>
            <button 
              onClick={() => window.open('https://youtu.be/tGPZmChPpXQ?si=AWRcMVjFa19HMqaa', '_blank')} 
              style={{ padding: '12px 24px', marginTop: '20px', cursor: 'pointer', fontSize: '1.1em', fontWeight: 'bold', backgroundColor: '#ff0000', color: '#ffffff', border: 'none', transition: 'background-color 0.3s', borderRadius: '5px' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#cc0000'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ff0000'}
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioTest;
