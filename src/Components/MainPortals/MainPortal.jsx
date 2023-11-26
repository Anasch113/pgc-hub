import React from 'react'
import { useState, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import Navbar from "../Home/Navbar"
import toast, {Toaster} from "react-hot-toast"
import {db} from "../../Firebase" 
import {collection, getDocs} from "firebase/firestore"
import {BsSearch} from 'react-icons/bs'

import "./mainportal.css"

import { useNavigate } from 'react-router-dom'
import Footer from '../Home/Footer'

const MainPortal = () => {

 
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")
  const [searchVal, setSearchVal] = useState('');

const [searchApiData, setSearchApiData] = useState([])

  useEffect(()=>{
const getUsers = async()=>{
const data = await getDocs(usersCollectionRef)
const usersData = data.docs.map((doc)=>({...doc.data(), id: doc.id}))
setUsers(usersData)
setSearchApiData(usersData)
console.log(searchApiData)
}
getUsers();
  }, [])

const navigate = useNavigate();
    const hanldeLogOut = async()=>{
        try {
          await  logOut()
          navigate("./")
          toast.success("Logout successfully")
        } catch (error) {
            
        }
    }
    const {user, logOut, }= useUserAuth();



    //Filter to control search
  
  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchVal(searchTerm);
  
    if (searchTerm === '') {
      setUsers(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
     

  
      if (filterResult.length === 0) {
        // No matches found, show alternative content or message
        setUsers([]); // Clear the articles array or set it to an empty array
        // You can also set a message to be displayed in the UI, e.g., "No matches found"
      } else {
        setUsers(filterResult);
      }
      
    
    }
  };
 
 
  return (
    <>
    <body className='main-portal-body'>

   
    <Navbar/>
    <div className='main-portal-container'>
      <div className="upper-container">
        
      <div className="heading">
<h2 id='bbb'>Welcome, {user && user.displayName || user.email} </h2>
{/* <h3 id='hhh'>BADGE : BSCS {smester} SMESTER</h3> */}


      </div>
     
      <div id='as-btns' className="button">

<div className="button">
<button id='as-btns1' onClick={()=>{navigate("./assignments")}}> Explore Assignments</button>

</div>
<button id='as-btns2' onClick={hanldeLogOut}>Logout</button>
</div>
      </div>
     
      <div className="m--main-container">
       
      <div className="boxes-heading">

<div className="line-txt">


<h5 className="line-text">
PGC <span>HUB</span> Student Info
</h5>
<div className="line">

</div>
</div>
<div className="st-info">
<div className="st-info-text">
Here is the all details regarding to the students. 
</div>
<div className="st-info-text">
You can find students names, students roll numbers, student CGPA and many more.

</div>

</div>
</div>
<div className='px-0 py-0 box-border flex flex-row items-center space-x-3'>
      <input value={searchVal} onInput={(e)=>handleFilter(e)} className=' px-64 py-6 bg-gray-200 rounded-2xl text-2xl  outline-none  max-[420px]:px-20 mb-5 mt-5' placeholder='Search ' type="search"  />
      <BsSearch className='text-5xl text-gray-400'/>
    </div>
{users.map((user)=>{
   
  
  return(
    <>
   
<div className="crud-boxes">


<div  className="crud-box">
  
         <div id='crud-span'>
        {user.name}
         </div>
     
      <h5>  CGPA:    {user.CGPA}</h5>
      <h5>  Status: {user.Status}</h5>
      <h5>Roll No:  {user.Rollno} </h5>

        </div>
        </div>
  </>
  )

})}
      </div>


      
    </div>
    <Toaster/>
    </body>
    <Footer/>
    </>
  )
}

export default MainPortal
