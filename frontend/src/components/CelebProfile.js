import React from 'react';
import { Link } from 'react-router-dom';
import celebRecords from '../data/celebPOSTEDdata.json'



//this is indiv celeb profile with metrics once you choose a celeb

function CelebProfile({celebName}) {


  //filter down results from celebRecords for corresponding celeb
  const targetProfile = celebRecords.filter(profiles => profiles.celebName === celebName);
  
 //then render the component with this attributes from this particular celebs record


  return (
       
      <div className="celebprofile">
              <div key={targetProfile.id}>
              <h1 className = "celebName">{targetProfile.celebName}</h1>
              <h1 className = "handle">{targetProfile.handle}</h1>
              <h1 className = "celebName">{targetProfile.sentiment}</h1>
              <h1 className = "celebName">{targetProfile.NumComments}</h1>
              <h1 className = "celebName">{targetProfile.NumPosts}</h1>
      </div>
        
      </div>

  );
}
export default CelebProfile;