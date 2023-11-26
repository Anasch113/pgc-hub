import React, { useId } from 'react'
import "./assignments.css"
import { useState, useEffect } from "react";
import Navbar from '../Home/Navbar';
import {AiOutlineDownload} from "react-icons/ai"
import {  db } from '../../Firebase';

import verified from '../../assets/verified.png'
import {BsSearch} from 'react-icons/bs'

import Delete from './Delete';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { Link } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import kitten from "../../assets/kitten.png"
import workplace from "../../assets/workplace.png"
import lightbulb from "../../assets/light-bulb.png"
import anonymous from "../../assets/anonymous.png"
import {FaExternalLinkAlt} from 'react-icons/fa';





const Assignments = () => {

   
const {user} = useUserAuth();

const [searchVal, setSearchVal] = useState('');

const [searchApiData, setSearchApiData] = useState([])
const [articles, setArticles] = useState([])
const [ singleUserId, setSingleUserId] = useState('');



  useEffect(() => {
    const articleRef = collection(db, "Articles")
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      setSearchApiData(articles)
    
  
    });
  
  }, []);
 

  //Filter to control search
  
  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchVal(searchTerm);
  
    if (searchTerm === '') {
      setArticles(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) =>
        item.createdBy.toLowerCase().includes(searchTerm)
      );
     

  
      if (filterResult.length === 0) {
        // No matches found, show alternative content or message
        setArticles([]); // Clear the articles array or set it to an empty array
        // You can also set a message to be displayed in the UI, e.g., "No matches found"
      } else {
        setArticles(filterResult);
      }
      
    
    }
  };




 const handleMoreFromUserClick = (userId)=>{
  const articlesUserId = userId;

  
  
}


 
  return (

<>

    <Navbar/>
    <div className='as-body'>
      
    

    
    <div className=" flex flex-col items-center justify-center gap-3 mt-7 w-full">
    
<div className='flex items-center flex-col w-full gap-3'>
<h5 className=" font-poppins text-gray-400 font-extrabold px-5 py-5 text-8xl gap-3 space-y-4 mb-5 align-middle flex items-center max-[420px]:text-5xl">Assignments Info</h5>

<div className='flex flex-row items-center justify-center gap-3 mb-6'>
  {/* icons */}
  <div className='flex items-center justify-center bg-gray-100 w-32 h-32 rounded-full space-x-3 '>
  <img className=' rounded w-20 h-20' src={workplace} alt="img" />
  </div>
  {/* icons */}
  <div className='flex items-center justify-center bg-gray-100 w-32 h-32 rounded-full space-x-3'>
  <img className='  space-x-3 rounded w-20 h-20' src={lightbulb} alt="img" />
  </div>
{/* icons */}
  <div className='flex items-center justify-center bg-gray-100 w-32 h-32 rounded-full space-x-3'>
  <img className=' rounded w-20 h-20' src={anonymous} alt="img" />
  </div>

</div>
{/* paragraph */}
<p className='text-gray-600 text-2xl flex items-center justify-center align-middle w-3/6 max-[420px]:w-3/4'> Explore our user-friendly assignment section where students can conveniently view and submit their assignments. </p>
<p className='text-gray-600 text-2xl flex items-center justify-center align-middle w-3/6   max-[420px]:w-3/4'>Stay organized and on top of your academic responsibilities with ease. </p>

</div>




</div>

    {/* // Submission Form */}
 
   
    <div className='root-container'>

    <div className="assign-tools">
<Link to='/portal/mainportal/addassignments'><button>Submit a New Assignment</button></Link> 
<div className='px-0 py-0 box-border flex flex-row items-center space-x-3'>
      <input value={searchVal} onInput={(e)=>handleFilter(e)} className=' px-64 py-6 bg-gray-200 rounded-2xl text-2xl outline-none border-0   max-[420px]:px-20 mb-5 mt-5 ' placeholder='Search ' type="search"  />
      <BsSearch className='text-5xl text-gray-400'/>
    </div>
</div>
<div className='main-assignment-container'>



      {articles.length === 0 ? (
      <img src={kitten} alt='img'  />
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
            <div className="submit-container-1" key={id}>
               
             
              <div className="row">
                <div className="row-assignment-box">

              
              <div className="react-icons">
               
<img   className=" h-20 w-20 object-cover rounded-full " src={DpUrl} alt="user" />
                 
                        
                        <h5> {createdBy}</h5>
                        <img className='w-12' src={verified} alt="" />
                      </div>
                <div className="main-submit">
               
                  <a href={imageUrl} target='_main' className='down-btn'>Download <div className='react-icons'><AiOutlineDownload/></div></a>
                  <div className="delete-con">
                    {
                      user && user.uid === userId &&(

                        <Delete id ={id} imageUrl = {imageUrl}/>
                      )
                    }

                  </div>
                </div>
                </div>
                <div className="Submit-details">
               
                 
                  <span className='sp-bl'><span className='mc'>To:</span> {title}</span>
                  <span className='sp-bl'><span className='mc'>Subject:</span>  {description}</span>
                  <span className='sp-bl'><span className='mc'>Topic:</span>  {topic}</span>
                  <span id='date-as'><span className='mc'>Date:</span>{createdAt.toDate().toDateString()}</span>
                  {/* Link to open single user assignments */}
             <Link to={`/portal/mainportal/singleuserassignments/${userId}`}> <button  onClick={handleMoreFromUserClick(userId)}
               className='text-4xl mt-5 '>  <FaExternalLinkAlt /></button></Link>
               <div className='single-assign-prop'>

               
             
              </div>
                </div>
              </div>
              
            </div>
          )
        )
      )}
      </div>
    </div>
    </div>
    </>
  )
}

export default Assignments

