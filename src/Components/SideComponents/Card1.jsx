import React from 'react'
import c1 from "../../assets/task.png"
import { useNavigate } from 'react-router-dom'
const Card1 = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* main carousel ================================== */}
      <div className="flex flex-row items-center justify-between w-2/3 self-center   h-custom rounded-2xl bg-[url('/cars-bg.svg')] bg-cover bg-center max-[500px]:flex-col-reverse  ">
        {/* left*/}
        <div className="flex  flex-col justify-center gap-8 w-1/2  h-full max-[500px]:w-full max-[500px]:gap-4">


<div className='flex flex-col items-center gap-5 justify-center '>
  <h1 className='text-7xl font-poppins font-bold  text-white w-2/3 max-[500px]:text-5xl max-[500px]:w-full max-[500px]:p-3'>Do Smart Work</h1>
<p className='text-gray-200 font-poppins text-2xl w-2/3  max-[500px]:w-full p-2 '>Boost your productivity with smart work strategies on our student management system</p>
</div>
  
  <button onClick={()=> navigate("/portal/mainportal/assignments")} className='px-8 py-4 w-44 ml-32 bg-white  text-dark-blue rounded-xl items-start'>Check Out</button>

        </div>
         {/* right*/}
<div  className="flex items-center h-full justify-center max-[500px]:h-2/3">
<img className='w-2/4' src={c1} alt="" />

 
</div>



      </div>
    </>
  )
}

export default Card1
