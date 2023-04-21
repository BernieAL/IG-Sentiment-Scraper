import React, { Component } from 'react'
import Navbar from "../components/Navbar";
import '../styles/Header.css';
import '../styles/AboutUs.css'
import Footer from "../components/Footer";

export class AboutUs extends Component {
    render() {
        return (
            <div>
                <Navbar/>

                <div className='header-container'>
      <video src='/videos/video-2.mp4' autoPlay loop muted />
      <h1>About Us</h1>
      <p className = 'para'>With Celebrity Sentiment Analysis (CSA), we bring you a
          a convenient way to check the general public's view on 
          a specific celebrity. Whether it would be your favorite
          athelete, singer, dancer, tik tok influencer, or youtube
          personality, we'll provide the most up to date reaction
          based on current comments from different users all over
          the world. CSA will save you time from scrolling through 
          individual comments on Instagram and provide commonly used
          phrases/words that determined the celebrities current 
          sentiment status.
      </p>
    </div>
    <Footer/>
            </div>
        )
    }
}

export default AboutUs
