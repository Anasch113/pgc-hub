import {React, useState} from 'react'
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import c1 from "../../assets/task.png"

import Card1 from '../SideComponents/Card1';
import Card2 from '../SideComponents/Card2';
const Carousels = () => {
  const [currentCard, setCurrentCard] = useState(1); // Initially show the first card

  const showNextCard = () => {
    setCurrentCard((prevCard) => (prevCard === 1 ? 2 : 1));
  };

  const showPrevCard = () => {
    setCurrentCard((prevCard) => (prevCard === 1 ? 2 : 1));
  };
 
  
  return (
    <div className=' flex items-center justify-center min-h-custom  overflow-x-hidden'>

{currentCard === 2 && <Card1 />}
      {currentCard === 1 && <Card2 />}
       {/* left/right arrows buttons */}
<div className='absolute w-2/3 overflow-x-hidden flex items-center justify-between max-[500px]:mb-24'>


<button>
   <FaChevronCircleLeft  onClick={showPrevCard} className='text-white ml-2' size={40}/>
      </button>
<button>
  <FaChevronCircleRight onClick={showNextCard} className='text-white mr-2' size ={40}/>
      </button>
      </div>
    
    </div>
  )
}

export default Carousels

