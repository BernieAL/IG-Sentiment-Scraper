import React, { Component } from 'react'
import axios from 'axios';
import Charts from "../components/Charts";
import { Chart } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import celebRecords from '../data/celebRecords.json'


//rendered by Analysis
//this is basic detail info for a specific celebprofile
export default function ProfileDetail({targetProfile}){
	

    console.log(targetProfile)
	// //filters postdata to find target celeb
	// const profiles = celebRecords.filter(profiles => profiles.celebName === targetCeleb);
	
	return (
		<>	
			<div>
				<div key={targetProfile.id}>
					<img className = "banner" src = {targetProfile.banner} alt = "banner"/>
					<h1 className = "celebName">{targetProfile.title}</h1>
					<p className = "description">{targetProfile.content}</p>
					<a className = "handle" href="">{targetProfile.handle}</a>
					<p className = "disclaimer">{targetProfile.disclaimer}</p>
					<img className = "celebPic" src = {targetProfile.img} alt = "celebPic"/>
				</div>
			</div>

		</>
	);
}