import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../services/firebaseConfig';
import TripCard from '../components/TripCard';

const MyTrips = () => {

    const [userTrips, setUserTrips]= useState([]);

    useEffect(()=>{
        getTrips();
    },[])

    const getTrips= async ()=>{
        const user= JSON.parse(localStorage.getItem('user'));
        // console.log("User in Mytrips page", user);
        // setUserTrips([]);
        const tempTrips= [];
        const q= query(collection(db,'trips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc.id, "=>", doc.data());
            // setUserTrips(prevTrips=>[...prevTrips,doc.data()])
            tempTrips.push(doc.data());
        })
        setUserTrips(tempTrips);
    }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-2xl mb-8'>My Trips</h2>
      <div className='mb-10 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
        {userTrips?.map((trip,index)=>(
            <TripCard key={index} trip={trip}></TripCard>
        ))}
      </div>
    </div>
  )
}

export default MyTrips
