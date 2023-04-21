import React from "react"
import celebRecords from '../data/celebRecords.json';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//this is indiv celeb card to be displayed on home page - for you to click on
//recieves props which will be the small details to display for a celeb card


export default function CelebProfileCard({celebName,occupation,img,handle,profileCardClicked}){


    //callback to parent, sending info of calling compoenet
    function handleCardClick(){
        //call parent callback passed as prop
        profileCardClicked(celebName,handle)
    }

    //function to handle button click
    //need to get celebName and handle off the button click for THIS component
    //and trigger a request to the backend
    //request should be created in parent component of celebProfileCard
    //need callback to send info from this component back to parent
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{celebName}</Card.Title>
            <Card.Text>
                {handle}
                {occupation}
            </Card.Text>
            <Button variant="primary" onClick={handleCardClick}>Analyze</Button>
          </Card.Body>
        </Card>
      );

}