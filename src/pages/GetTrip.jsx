import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../services/firebaseConfig';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Itinerary from '../components/Itinerary';

const GetTrip = () => {
    const {id}= useParams();
    // console.log(id);
    const [trip,setTrip]= useState([]);

    useEffect(()=>{
        document.title="View Trip"
    },[])

    useEffect(()=>{
        if(id){
            getTripData();
        }
    },[id])

    const getTripData= async()=>{
        const docRef= doc(db,'trips',id);
        const docSnap= await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Document:",docSnap.data());
            setTrip(docSnap.data());
        } else{
            console.log("No document found");
        }
    }

  return (
    <div className='flex flex-col gap-5 sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <InfoSection trip={trip}></InfoSection>
      <Hotels trip={trip}></Hotels>
      <Itinerary trip={trip}></Itinerary>
    </div>
  )
}

export default GetTrip
