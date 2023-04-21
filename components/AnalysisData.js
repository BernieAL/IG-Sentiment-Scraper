import React, { Component } from 'react'
import axios from 'axios';
import Charts from "../components/Charts";
import { Chart } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import celebRecords from '../data/celebRecords.json'

//rendered by Analysis
//this is the calculated data retrieved from server for target celeb
export default function AnalysisData({server_retrieved_data}){
	

    console.log(server_retrieved_data)
	
	return (
		<>	
            <div>
                <h1>{server_retrieved_data[0].NumComments}</h1>
                <h1>{server_retrieved_data[0].NumPosts}</h1>
                <h1>{server_retrieved_data[0].celebName}</h1>
                <h1>{server_retrieved_data[0].handle}</h1>
                <h1>{server_retrieved_data[0].handlelink}</h1>
                <h1>{server_retrieved_data[0].sentiment['positive']}</h1>
                <h1>{server_retrieved_data[0].sentiment['negative']}</h1>
            </div>
		</>
	);
}