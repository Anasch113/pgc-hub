import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useUserAuth } from "../../context/UserAuthContext";




// import {
//   FaFacebookSquare,
//   FaInstagramSquare,
//   FaYoutubeSquare,
// } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/logo.png"

import { NavLink } from "react-router-dom";
import { useRef } from "react";

 
const Navbar = () => {

  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [open, setOpen] = useState(false)
  // const [user, setUser] = useState(null);
  const { user, logOut} = useUserAuth();
  const navigate = useNavigate();
  const MenuRef = useRef(null);
  const ImgRef = useRef(null);
  const menuRef = useRef(null)


  useEffect(() => {
    // Function to handle clicks outside of the dropdown
    function handleClickOutside(event) {
      if (ImgRef.current && !ImgRef.current.contains(event.target) && MenuRef.current && !MenuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
   

    // Add the event listener when the dropdown is open
    if (open) {
      window.addEventListener('click', handleClickOutside);
    }

    // Clean up the event listener when the component unmounts or when the dropdown is closed
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [open]);
  const handleLogout = async()=>{
    await  logOut()
    navigate('/portal')
  }


  // Auto closing hamburger menu

  
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
          ref={menuRef}>
          <ul>
          <div className="userprofile2   relative " >
          {
  user ? (
<img  src={user.photoURL}
ref={ImgRef}
onClick={()=>setOpen(!open)}
  alt="user"
  className=" h-20 w-20 object-cover border-4 border-grey-400 rounded-full cursor-pointer"
/>
  ) :
  (
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrrxsxZSpsfebkw8VLXe6R5j7mryT6PK7Pg&usqp=CAU" 
alt="user"
className=" h-20 w-20 object-cover border-4 border-grey-400 rounded-full cursor-pointer"
onClick={()=>setOpen(!open)}
/>

  )
}
<li>
              <Link to="/portal/profile">Profile</Link>
            </li>
            {
              user? (
                <li>
                <Link onClick={handleLogout} to='portal'>Logout</Link>
              </li>
              ) :
              (
<li>
                <Link  to='aboutt'>About</Link>
              </li>
              )
            }
           

</div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/portal/mainportal/assignments"> Assignments</Link>
            </li>
            {
              user ? (
                <li>
                  <Link to='/portal/mainportal/dashboard'>Dashboard</Link>
                </li>

              ) : (
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              )
            }
            <li>
              <Link to="/portal/mainportal">Student Portal</Link>
            </li>
          
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="social-media">

          
          {/* hamburget menu start  */}
          <div className="hamburger-menu">
            <a href="#"onClick={(e) => {
              e.preventDefault(); // Prevent the default link behavior
              setShowMediaIcons(!showMediaIcons);
            }}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center mb-10 mr-10"> 

            
<div id="userprofile"  className="relative" >
  
{
  user ? (
<img  src={user.photoURL}
ref={ImgRef}
onClick={()=>setOpen(!open)}
  alt="user"
  className=" h-20 w-20 object-cover border-4 border-grey-400 rounded-full cursor-pointer"
/>
  ) :
  (
    <div>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrrxsxZSpsfebkw8VLXe6R5j7mryT6PK7Pg&usqp=CAU" 
alt="user"
className=" h-20 w-20 object-cover border-4 border-grey-400 rounded-full cursor-pointer"

/>
<h5>Login to use</h5>
    </div>


  )
}


{
  open &&(
    <div ref={MenuRef} className="bg-white z-20 p-4 w-52 shadow-lg absolute  -left-20 top-24">
    <ul>
      <li onClick={()=>setOpen(false)} className="p-2 z-20 text-lg cursor-pointer rounded hover:bg-blue-100">
        <Link to='/portal/profile'>Profile</Link>
      </li>
      <li  onClick={()=>setOpen(false)} className="p-2 z-20 text-lg cursor-pointer rounded hover:bg-blue-100">
        <Link onClick={handleLogout} to='/portal'>Logout</Link>
      </li>
      
    </ul>
  </div>
  )
}

</div>
</div>
      </nav>




    </>
  );
};

export default Navbar;









