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
					<img className="banner" src={targetProfile[0].banner} alt="banner" />
					<h1 className="celebName">{targetProfile[0].celebName}</h1>
					<p className="description">{targetProfile[0].content}</p>
					<a className="handle" href={targetProfile[0].handlelink}>
						{targetProfile.handle}
					</a>
					<p className="disclaimer">{targetProfile[0].disclaimer}</p>
					<img className="celebPic" src={targetProfile[0].img} alt="celebPic" />
				</div>
			</div>

		</>
	);
}