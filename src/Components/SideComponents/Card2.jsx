import React from 'react'
import c1 from "../../assets/analysis.png"
import { useNavigate } from 'react-router-dom'
const Card2 = () => {
    const navigate  = useNavigate()
  return (
    <>
       {/* main carousel ================================== */}
       <div className="flex flex-row items-center justify-between w-2/3 self-center   h-custom rounded-2xl bg-[url('/cars-bg.svg')] bg-cover bg-center  max-[500px]:flex-col-reverse ">
        {/* left*/}
        <div className="flex  flex-col justify-center gap-8 w-1/2  h-full max-[500px]:w-full max-[500px]:gap-2">


<div className='flex flex-col items-center gap-5 justify-center '>
  <h1 className='text-6xl font-poppins font-bold leading-tight  text-white w-2/3 max-[500px]:text-3xl max-[500px]:w-full max-[500px]:p-3'>ACCESS YOUR <span className='text-6xl font-poppins font-bold leading-tight text-orange-400  w-2/3 max-[500px]:text-3xl'>SMESTER </span> CREDENTIALS</h1>
<p className='text-gray-200 font-poppins text-2xl w-2/3  '> Your door to knowledge is open! Stay updated with your smesters CGPA, student status, and many more.  </p>
</div>
  
  <button onClick={()=> navigate("/portal/mainportal")} className='px-8 py-4 w-44 ml-32 bg-white  text-dark-blue rounded-xl items-start max-[500px]:px-5 max-[500px]:py-2'>Check Out</button>

        </div>
         {/* right*/}
<div  className="flex items-center h-full justify-center ">
<img className='w-2/4' src={c1} alt="" />

 
</div>



      </div>
    </>
  )
}

export default Card2
