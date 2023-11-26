import React from 'react'

import { db } from '../../Firebase';
import { AiOutlineDownload } from "react-icons/ai"

import Delete from './Delete';
import Navbar from '../Home/Navbar';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useUserAuth } from '../../context/UserAuthContext';
import { Link } from 'react-router-dom';
import "./dashboard.css"
import {MdOutlineDashboardCustomize} from 'react-icons/md'
import Chart from "../Charts/Chart"
import kitten from "../../assets/kitten.png"
import dbdesign from '../../assets/db-design.png'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const { user } = useUserAuth();
  const [articles, setArticles] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    const articleRef = collection(db, "Articles")
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        
      }));
      setArticles(articles);
     
    });

  }, []);
  return (
    <>
      <Navbar />
      <div className="main-dashboard">
        <div className="dashboard-navbar">
          <div className="db-heding-2">
<MdOutlineDashboardCustomize className='db-icon'  style={{ fontSize: '2rem' }}/>
        <Link to='/portal/mainportal/dashboard'><h1 >  DashBoard</h1></Link>
          </div>  
         
          <ul className='db-ul'>
            <li>
              <Link className='li' to="/portal/mainportal/addassignments">Submit Assignments</Link>
            </li>
            <li>
              <Link className='li' to="/portal/profile">My Profile</Link>
            </li>
          </ul>
        </div>
  <div className="dashboard-hero-section">

  

<div className="db-assignments">
<div className='db-assignments-heading'>
  <h2>My Assignments</h2>
</div>

        {articles.length === 0 ? (
        <img src={kitten} alt="img" />
        ) : (
          articles.map(
            ({
              id,
              title,
              description,
              topic,
              imageUrl,
              createdAt,
              createdBy,
              userId,
              DpUrl,
            }) => (
              <div className='dashboard' key={id}>
                <div className="db-hed-2">
                  
                </div>
                {user && user.uid === userId && (
                  <div className="submit-container-1">
                    <div className="row-db">
                      <div className='row-assignment-box'>
                      <div className="react-icons">
                        <img   className=" h-20 w-20 object-cover rounded-full " src={user.photoURL} alt="user" />
                        <h5> {createdBy}</h5>
                      </div>
                      <div className="main-submit">
                        <a href={imageUrl} target='_main' className='down-btn'>Download <div className='react-icons'><AiOutlineDownload /></div></a>
                        <div className="delete-con">
                        {user && user.uid === userId && (
                          <Delete id={id} imageUrl={imageUrl}  />
                        )}
                        </div>
                      </div>
                      
                      </div>
                      <div className="Submit-details">
                        <span className='sp-bl'><span className='mc'>To:</span> {title}</span>
                        <span className='sp-bl'><span className='mc'>Subject:</span>  {description}</span>
                        <span className='sp-bl'><span className='mc'>Topic:</span>  {topic}</span>
                        <span id='date-as'><span className='mc'>Date:</span>{createdAt.toDate().toDateString()}</span>
                      </div>
                    </div>
                  </div>
                )}


              </div>
            )
          )
        )}
        </div>

        <div className='flex flex-col items-center justify-center self-center'>

        <div className=' flex flex-row items-center justify-center gap-7  max-[1170px]:flex-col max-[670px]:flex-row max-[400px]:flex-col '>
          
<div className='flex flex-col w-96 h-64 items-center justify-center bg-gradient-to-right rounded-2xl gap-5'> 
<h3 className='text-gray-700 align-middle text-2xl flex items-center w-72'>Your unique work deserves to be presented with style. Unleash the power of your ideas! </h3>
<button onClick={()=> navigate('/portal/mainportal/addassignments')} className='px-3 py-2 bg-custom-blue text-white text-xl rounded-md  hover:bg-dark-blue '>Let's Go</button>
</div>
<div className='flex flex-row w-2/6 h-64 items-center  bg-white rounded-2xl  max-[1170px]:w-2/4'> 
<h3 className='text-gray-700 ml-5 align-middle text-2xl flex items-center z-20  max-[1170px]:text-sm'>Your contributions are not just submissions; they are statements of excellence, ready to captivate and inspire</h3>
<img className='self-end  z-10  max-[1170px]:w-44' src={dbdesign} alt="img" />
</div>

        </div>



        <div className="db-charts">
        <Chart/>
        
        
        </div>
        </div>
        </div>
      </div>
      
    </>
  );
}

export default Dashboard

