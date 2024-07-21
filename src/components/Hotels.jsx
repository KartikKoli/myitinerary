import React from "react";
import bgimg from "../assets/bgimg.jpg";
import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";

const Hotels = ({ trip }) => {
  // console.log(trip?.tripData?.hotel_options);

  return (
    <>
      <h1 className="font-bold text-2xl mt-10">Hotel Recommendations</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {trip?.tripData?.hotel_options.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel}></HotelCard>
        ))}
      </div>
    </>
  );
};

export default Hotels;
