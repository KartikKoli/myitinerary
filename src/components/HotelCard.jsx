import React, {useEffect, useState} from 'react';
import { IMAGE_REF_URL } from '../services/globalApi';
import { Link } from 'react-router-dom';
import { getPlaceDetails } from '../services/globalApi';
import replacement from "../assets/replacement.png";

const HotelCard = ({hotel}) => {

    const [img, setImg]= useState();

    useEffect(()=>{
        if(hotel){
            getPlaceImage();
        }
    },[hotel])

    const getPlaceImage= async()=>{
        const data={
            textQuery: hotel?.name
        }

        const result= await getPlaceDetails(data).then(res=>{
            // console.log(res.data.places[0].photos[2].name);
            const imgUrl= IMAGE_REF_URL.replace('NAME',res.data.places[0].photos[2].name);
            setImg(imgUrl);
        })
    }

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`} target='_blank'>
        <div className='bg-slate-100 rounded-md shadow-lg hover:scale-105 transition-all'>
            <img className='rounded-md w-full h-[200px]' src={img? img : replacement} alt="bgimg" />
            <div>
                <p className='text-sm font-semibold'>🏨 {hotel?.name}</p>
                <p className='text-sm font-semibold'>📍 {hotel?.address}</p>
                <p className='text-sm font-semibold'>💲 {hotel?.price}</p>
                <p className='text-sm font-semibold'>⭐ {hotel?.rating}</p>
            </div>
        </div>
        </Link>
  )
}

export default HotelCard
