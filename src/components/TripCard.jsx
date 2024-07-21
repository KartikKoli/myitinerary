import React, { useEffect, useState } from "react";
import { getPlaceDetails, IMAGE_REF_URL } from "../services/globalApi";
import { Link } from "react-router-dom";
import replacement from "../assets/replacement.png";


const TripCard = ({ trip }) => {
  const stringDate = trip?.id;
  const intDate = parseInt(stringDate);
  const date = new Date(intDate);
  const formattedDate = date.toLocaleDateString();

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
            // console.log(res.data.places[0].photos[2].name);
            const imgUrl= IMAGE_REF_URL.replace('NAME',res.data.places[0].photos[2].name);
            setImg(imgUrl);
        })
    }

  return (
    <Link to={`/viewtrip/${trip?.id}`}>
    <div className="flex flex-col bg-slate-200 rounded-lg shadow-lg  cursor-pointer hover:scale-105 transition-all">
      <img src={img? img : replacement} alt="bgimg" className="rounded-lg w-full h-[200px]"/>
      <div className="px-2">
        <h2>📍 {trip?.userSelection?.location?.label}</h2>
        <h2>💰 {trip?.userSelection?.budget} budget</h2>
        <h2>👥 For {trip?.userSelection?.traveler}</h2>
        <h2>📅 Generated on {formattedDate}</h2>
      </div>
    </div>
    </Link>
  );
};

export default TripCard;
