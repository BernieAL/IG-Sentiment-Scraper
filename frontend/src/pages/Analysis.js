import React from 'react'
import { useParams } from "react-router-dom";
import celebRecords from '../data/celebRecords.json'
import '../styles/Analysis.css';
import Navbar from '../components/Navbar';
import ProfileDetail from '../components/ProfileDetail';
import Charts from "../components/Charts";
import { Chart } from 'react-chartjs-2';
import AnalysisData from '../components/AnalysisData'


export default function Analysis({location}) {
    
    //getting targetCeleb off useParams hook
    const { celebName } = useParams();
    console.log(celebName)
    
    //filters postdata to find target celeb - this is for profile detail
    const targetProfile = celebRecords.filter(profile => profile.celebName == celebName);
    console.log(targetProfile) 
    
    //retrieve posted data passed in as data 
    const server_retrieved_data = location.state.data
    console.log(server_retrieved_data )

    return (
        <div>
            {/* <Navbar/> */}
            
            <ProfileDetail targetProfile={targetProfile} />
            <AnalysisData server_retrieved_data={server_retrieved_data}/>
            <Charts server_retrieved_data={server_retrieved_data}/>
        </div>
    )
    
}

