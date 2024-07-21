import React from 'react';
import Places from './Places';

const Itinerary = ({trip}) => {
  return (
    <div>
      <h1 className='font-bold text-2xl'>Your daywise itinerary:</h1>
      {trip?.tripData?.itinerary.map((day,index)=>(
        <div key={index} className='my-3'>
            <h2 className='font-bold text-xl mb-2'>Day: {day?.day}</h2>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-10'>
            {day?.plan.map((place,ind)=>(
                <Places key={ind} place={place}></Places>
            ))}
            </div>
        </div>
      ))}
    </div>
  )
}

export default Itinerary
