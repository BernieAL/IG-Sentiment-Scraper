import React, { Component } from 'react'
import axios from 'axios';
import Charts from "../components/Charts";
import { Chart } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import celebRecords from '../data/celebRecords.json'

//rendered by Analysis
//this is the calculated data retrieved from server for target celeb
export default function ProfileDetail({server_retrieved_data}){
	

    console.log(server_retrieved_data)
	
	return (
		<>	
			<div>
				<div key={server_retrieved_data.id}>
					<h1>{server_retrieved_data.NumComments}</h1>
					<h1>{server_retrieved_data.NumPosts}</h1>
                    <h1>{server_retrieved_data.celebName}</h1>
                    <h1>{server_retrieved_data.handle}</h1>
                    <h1>{server_retrieved_data.handlelink}</h1>
					<h1>{server_retrieved_data.sentiment}</h1>
				</div>
			</div>

		</>
	);
}