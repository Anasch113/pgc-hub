import React from 'react'
import Navbar from "./Navbar"
import Hero from "./Hero"
import Services from './Services'
import Footer from './Footer'
import Carousels from './Carousels'
const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <Hero/>
      <Services/>
      <Carousels/>
      <Footer/>

    </div>
  )
}

export default Home
