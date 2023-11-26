import React from 'react'
import Navbar from '../Home/Navbar'
import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase';
import Assignments from './Assignments';
import kitten from '../../assets/kitten.png'
import { useUserAuth } from '../../context/UserAuthContext';
import { useParams } from 'react-router-dom';
import {AiOutlineDownload} from "react-icons/ai"
import verified from '../../assets/verified.png'
import Delete from './Delete';
import workplace from "../../assets/workplace.png"
import lightbulb from "../../assets/light-bulb.png"
import anonymous from "../../assets/anonymous.png"
import { Link } from 'react-router-dom';
const SingleUserAssignments = () => {


  const {user} = useUserAuth();

  const userId = useParams() // Get userId from URL parameters
 const userId2 = userId;
 

const [singleUserAssignments, setSingleUserAssignments] = useState([])
useEffect(() => {


  const articleRef = collection(db, "Articles");
  const q = query(articleRef, orderBy("createdAt", "desc"));

  onSnapshot(q, (snapshot) => {
    const articles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
   
  //  Filtering the document using by userId

   const filteredArticles = articles.filter((articles)=> articles.userId === userId2.userId);
   
   setSingleUserAssignments(filteredArticles);
   console.log(userId2)
  

  });
}, []);


  return (
    <>
    ;
    <Navbar/>
    <div className='flex flex-row items-center gap-5 flex-wrap justify-center w-full bg-offWhite min-h-[600px]'>
     <div className='w-2/5 bg-white h-96 rounded-3xl shadow-sm flex flex-row items-center justify-evenly max-[400px]:flex-col max-[400px]:w-96 '>
      <div className='flex flex-col items-center gap-3'>
      <h3 className='text-gray-500 font-poppins text-4xl w-96 max-[400px]:text-2xl max-[400px]:ml-10 max-[400px]:justify-center max-[400px]:'>Explore the Assignments of Every Student with this PGC-HUB Awesome Feature.</h3>
      <div className='flex flex-row items-center justify-center mb-6 self-start max-[400px]:ml-10'>
  {/* icons */}
  <div className='flex items-center justify-center  w-24 h-24 rounded-full  '>
  <img className=' rounded w-14 h-14' src={workplace} alt="img" />
  </div>
  {/* icons */}
  <div className='flex items-center justify-center w-24 h-24 rounded-full '>
  <img className='  rounded w-14 h-14' src={lightbulb} alt="img" />
  </div>
{/* icons */}
  <div className='flex items-center justify-center w-24 h-24 rounded-full '>
  <img className='rounded w-14 h-14' src={anonymous} alt="img" />
  </div>

</div>
      </div>

 <Link to='/portal/mainportal/assignments'> <button className='px-6 py-4 bg-custom-blue text-white rounded-md text-xl hover:bg-dark-blue'>Back to Assignments</button></Link>
     </div>

    <div className='flex flex-row flex-wrap items-center gap-5'>
    {singleUserAssignments.length === 0 ? (
       <div> <img src={kitten}  /></div>
      ) : (
        singleUserAssignments.map(
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
                 
                
                    
                  </div>
                </div>
                
              </div>
              )
            
         
          )
        
      )}
</div>

    </div>
    </>
  )
}

export default SingleUserAssignments
