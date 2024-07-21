import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h1 className='font-extrabold text-[40px]'>AI Powered Itinerary Generation</h1>
      <p className='font-bold'>Get Itineraries instantly</p>
      <Link to="/createtrip"><button className='bg-red-600 p-2 text-white mt-2 rounded-lg font-semibold'>Start Journey</button></Link>
    </div>
  )
}

export default Hero
Hero