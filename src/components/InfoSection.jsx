import React, { useEffect, useState } from 'react';
import { getPlaceDetails } from '../services/globalApi';
import { IMAGE_REF_URL } from '../services/globalApi';
import replacement from "../assets/replacement.png";

const InfoSection = ({trip}) => {

    const [img, setImg]= useState();

    useEffect(()=>{
        if(trip){
            getPlaceImage();
        }
    },[trip])

    const getPlaceImage= async()=>{
        const data={
            textQuery: trip?.userSelection?.location?.label
        }

        const result= await getPlaceDetails(data).then(res=>{
            console.log(res.data.places[0].photos[2].name);
            const imgUrl= IMAGE_REF_URL.replace('NAME',res.data.places[0].photos[2].name);
            setImg(imgUrl);
        })
    }

  return (
    <div>
      <p className='text-center text-4xl font-bold'>Trip Summary</p>
      <div className='mt-5'>
        <img className='w-full h-[600px] rounded-lg' src={img? img : replacement} alt="background" />
        <div className='md:flex md:flex-row sm:flex sm:flex-col sm:items-center sm:gap-2 gap-5 justify-between mt-5'>
            <p className='text-lg'><span className='font-semibold'>📍 Location:</span> {trip?.userSelection?.location?.label}</p>
            <p className='text-lg'><span className='font-semibold'>📅 Days:</span> {trip?.userSelection?.noOfDays}</p>
            <p className='text-lg'><span className='font-semibold'>💰 Budget:</span> {trip?.userSelection?.budget}</p>
            <p className='text-lg'><span className='font-semibold'>👨‍👩‍👧‍👦 People:</span> {trip?.userSelection?.traveler}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoSection
