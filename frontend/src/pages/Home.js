import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Profiles from '../components/Profiles';
import Footer from '../components/Footer';
import CelebProfileCard from '../components/CelebProfileCard';

function Home() {
  return (
    <>
      {/* <Navbar/> */}
      <Header/>
      <Profiles/>
    </>
  );
}

export default Home;