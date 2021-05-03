import React from 'react'
import { useParams } from "react-router-dom";
import PostData from '../data/posts.json';
import '../styles/Analysis.css';
import Navbar from '../components/Navbar';
//import Footer from '../components/Footer';
import Charts from "../components/Charts";


export default function Analysis() {
    
const { title } = useParams();
const profiles = PostData.filter(profiles => profiles.title === title);
  
    return (
      <div>
        
        {<Navbar/>}
               {profiles.map(pr => (
                    <div key={pr.id}>
                        
                        <img class = "banner" src = {pr.banner} alt = "banner"/>
                        <h1 class = "celebName">{pr.title}</h1>
                        <p class = "description">{pr.content}</p>
                        <a class = "handle" href= {pr.handlelink}>{pr.handle}</a>
                        <p class = "disclaimer">{pr.disclaimer}</p>
                        <img class = "celebPic" src = {pr.img} alt = "celebPic"/>
                        

                        {/* <div>
                        <img class = "mood" src = "/images/positive.jpg" alt = "smiley"/>
                        </div> */}
                    
                        {<Charts
                            handle={pr.handle}
                        />} 
                         
                    </div>

                    
                ))}


                
            </div>
        )
    
}

