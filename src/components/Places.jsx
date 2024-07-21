import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlaceDetails } from "../services/globalApi";
import { IMAGE_REF_URL } from "../services/globalApi";
import replacement from "../assets/replacement.png";

const Places = ({ place }) => {

    const [img, setImg]= useState();
    // console.log(place);

    useEffect(()=>{
        if(place){
            getPlaceImage();
        }
    },[place])
    
    const getPlaceImage= async()=>{
        const data={
            textQuery: place?.place_name
        }

        const result= await getPlaceDetails(data).then(res=>{
            // console.log(res.data.places[0].photos[2].name);
            const imgUrl= IMAGE_REF_URL.replace('NAME',res.data.places[0].photos[2].name);
            setImg(imgUrl);
        })
    }

  return (
    <div>
      <p className="font-semibold text-md text-orange-500 mb-1">
        ⏰ <span className="font-medium">{place?.time}</span>
      </p>
      <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.place}`} target="_blank">
        <div className="bg-slate-100 rounded-md shadow-lg hover:scale-105 transition-all">
          <img
            src={img ? img : replacement}
            alt="bgimg"
            className="rounded-lg w-full h-[200px]"
          />
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-sm mb-1">🏝️ {place?.place_name}</p>
            <p className="font-semibold text-sm">📝 {place?.place_details}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Places;
