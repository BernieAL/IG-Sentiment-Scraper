import React, {Component, useEffect, useState} from 'react';
import {Pie, Bar} from 'react-chartjs-2'
import axios from 'axios';
//import PostData from '../data/posts.json';



function Chart({server_retrieved_data}) {

  
  const [instaData,setInstaData] = useState({});

  // useEffect(() => {    
  //   retrieveInstaData();
  // }, []);

  const Charts = {
    labels: ['Positive', 'Negative'],
    datasets: [
      {
        label: 'User Comments',
        backgroundColor: [
          '#36ff3c',
          '#C9DE00'
        ],
        hoverBackgroundColor: [
        '#166918',
        '#4B5000'
        ],
        data: [30,70]
        // data: [instaData.PositiveSentimentRating, instaData.NegativeSentimentRating]
      }
    ]
  }

  // const retrieveInstaData = () => {
    
  //   const url = "http://localhost:5000/search?celebhandle=" + props.handle
  //   axios
  //     .get(url)
  //     //.get("https://ig-scraper-senior.herokuapp.com/search?celebhandle=@jakepaul")
  //     //.get("https://jsonplaceholder.typicode.com/users")
  //     .then(res => {
  //       setInstaData(res.data)
  //       //console.log(res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }
  
  return (
    <div>
      <Pie
        data={Charts}
        width={250}
        height={250}
        options={{
          maintainAspectRatio: false,
          title:{
            display:true,
            text:'Average Sentiment',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
  </div>
  );
}

export default Chart;