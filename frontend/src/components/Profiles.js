import React from 'react';
import '../styles/Profile.css';
import ProfileItems from '../components/ProfileItems';

function profile() {
  
  return (
    <div className='profile'>
      <h1>Choose A Profile</h1>
      <div className='profile__container'>
        <div className='profile__wrapper'>
          <ul className='profile__items'>
            <ProfileItems
              src='images/KimK.jpg'
              text='Kim Kardashian - Skims'
              label='Social Media Influncer'
              title = 'Kim_Kardashian'
              handle = "@kimkardashian"
              //path='/analysis'
            />
            <ProfileItems
              src='images/TheRock.jpg'
              text='The Rock - Zoa Energy Drink'
              label='Pressional Wrestler & Actor'
              title = 'The_Rock'
              handle = "@therock"
              //path='/'
            />
          </ul>
          <ul className='profile__items'>
            <ProfileItems
              src='images/Ronaldo.jpg'
              text='Cristiano Ronaldo - Portugal Team'
              label='Professional Soccer Player'
              title = "Cristiano_Ronaldo"
              handle = "@cristiano"
              //path='/'
            />
            <ProfileItems
              src='images/Kylie.jpg'
              text='Kylie Jenner - Kylie Cosmetics'
              label='Social Media Influncer'
              title = "Kylie_Jenner"
              handle = "@kyliejenner"
              //path='/'
            />
            <ProfileItems
              src='images/Jake.jpg'
              text='Jake Paul- YT Content Creator'
              label='Owner'
              title = "Jake_Paul"
              handle = '@jakepaul'
              //path='/'
            />
            <ProfileItems
              src='images/Jeffree.jpg'
              text='Jeffree Star - Jeffree Star Cosmetics'
              label='Beauty Guru'
              title = "Jeffree_Star"
              handle = "@jeffreestar"
              //path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default profile;
