import React from 'react'
import "./hero.css"
import wave from "../../assets/wave2.svg"
import hero from "../../assets/logo7.png"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Hero = () => {
  const navigate = useNavigate()
  return (
    <body className='hero-body'>
      
   
    <div className='hero-container'>
      
    <div className="main-hero-section">
      
      <div className="main-container">


      
      <div className="left wow animate__animated animate__slideInLeft">
        <div className="left-hed">
        <span id='pgc-hub'>PGC HUB</span>
<h1>EXPLORE THE NEW AGE OF <span id='hero-span'>EDUCATION</span>  WITH  US</h1>
<p className='text-gray-500 text-3xl  '>Our mission is to simplify the lives of students and educators by providing a comprehensive online platform tailored to the unique needs of both </p>
        </div>
        

<div className="hero-btn">
  <div className="hero-btns">
    <button onClick={()=>{navigate("./aboutt")}} id='f-btn'>Read More </button>
    <button onClick={()=>{navigate("./signup")}} id='s-btn'>Join Now </button>
  </div>
</div>
      </div>
      <div className="right wow animate__animated animate__slideInRight">
<img src={hero} alt="" />
      </div>
      </div>
    </div>
    </div>
    </body>
  )
}

export default Hero
