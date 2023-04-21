import React from 'react';
import '../styles/Profile.css';
import CelebProfile from './CelebProfile';
import celebRecords from '../data/celebRecords.json';
import celebPostData from '../data/celebPOSTEDdata.json';
import CelebProfileCard from './CelebProfileCard';
import CardGroup from "react-bootstrap/CardGroup";
import {useState} from 'react'
import {useHistory} from 'react-router-dom'

// this is a list of celeb profiles cards to choose from on home page
function Profiles() {
  
  const celebProfileCards = []

    const [data,setData] = useState(null)
    const history = useHistory();
    
  // callback function passed to child for passing of data from child to parent
  function profileCardClicked(celebName,handle) {
      console.log(celebName + '\n' + handle)
      retrieveCelebData(celebName,handle)
  }

  function retrieveCelebData(celebName,handle){

    // axios request to backend
    //once request completed, reroute to analysis page

      // setData(celebPostData)

      history.push('/analysis/'+celebName, {data:celebPostData})
  }

  //make request to backend
  //get data back
  //reroute to analysis page for THIS celeb with retrieved data
  //possible conditional rendering 


  for(let i=0;i<celebRecords.length;i++){
    const {celebName,occupation,img,handle} = celebRecords[i]
    
    celebProfileCards.push(
      <CelebProfileCard
          celebName={celebName}
          occupation={occupation}
          img={img}
          handle={handle}
          profileCardClicked={profileCardClicked}
      />
    )
  }



  return (
    <div className='profile'>
      <h1>Choose A celebrity to view their current sentiment</h1>
        {/* <ul className='profile__items'>{celebProfileCards}</ul> */}
        <CardGroup>{celebProfileCards}</CardGroup>

    </div>
  );
}

export default Profiles;
