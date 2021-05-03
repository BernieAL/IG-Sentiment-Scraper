import React from 'react';
import '../App.css';
import { Button } from './Button';
import '../styles/Header.css';

function Header() {
  return (
    <div className='header-container'>
      <video src='/videos/world.mp4' autoPlay loop muted />
      <h1>CELEBRITY SENTIMENT ANALYSIS</h1>
      <p></p>
      <div className='header-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('It is clicked!')}
        >
          HOW IT WORKS <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default Header;