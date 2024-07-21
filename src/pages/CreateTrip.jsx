import React, { useEffect, useState } from "react";
import GooglePlacesAutoComplete from "react-google-places-autocomplete";
import {
  AI_PROMPT,
  budgetOptions,
  travelCategories,
} from "../constants/options";
import { toast } from "react-toastify";
import { chatSession } from "../services/geminimodel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [destination, setDestination] = useState(null);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(()=>{
    document.title="Create Trip"
  },[])

  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  const generateMyTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      toast.warn("Please sign in first to generate the trip");
      return;
    }

    const days = parseInt(formData?.noOfDays);
    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Please provide all required details");
      return;
    }
    if (days > 7) {
      toast.warn("No. of days must be less than 8");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    //console.log(FINAL_PROMPT);
    setLoading(true);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    //console.log(result?.response?.text());
    saveMyTrip(result?.response?.text());
  };

//   const saveMyTrip = async (tripData) => {
//     console.log(JSON.parse(tripData));
//     const docId = Date.now().toString();
//     const user = JSON.parse(localStorage.getItem("user"));
//     setLoading(true);
//     await setDoc(doc(db, "trips", docId), {
//       userSelection: formData,
//       tripData: JSON.parse(tripData),
//       userEmail: user?.email,
//       id: docId,
//     });
//     setLoading(false);
//     navigate(`/viewtrip/${docId}`);
//   };

const saveMyTrip = async (tripData) => {
    console.log(tripData);
    if (typeof tripData === 'string') {
      try {
        const parsedTripData = JSON.parse(tripData);
        const docId = Date.now().toString();
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        await setDoc(doc(db, "trips", docId), {
          userSelection: formData,
          tripData: parsedTripData,
          userEmail: user?.email,
          id: docId,
        });
        setLoading(false);
        navigate(`/viewtrip/${docId}`);
      } catch (error) {
        console.error("Error parsing trip data:", error);
      }
    } else {
      console.error("tripData is not a string");
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-2xl mt-4">
          Help us get your travel preferences
        </h2>
        <p className="font-semibold mt-2 text-xl">
          Just fill the details required below
        </p>
      </div>
      <div className="mt-4">
        <div>
          <h2 className="font-medium text-lg">Enter the Destination</h2>
          <GooglePlacesAutoComplete
            selectProps={{
              destination,
              onChange: (v) => {
                setDestination(v);
                handleChange("location", v);
              },
            }}
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
          ></GooglePlacesAutoComplete>
        </div>
        <div className="mt-4">
          <h2 className="font-medium text-lg">
            Please mention the number of days for which you are planning the
            trip
          </h2>
          <input
            onChange={(e) => handleChange("noOfDays", e.target.value)}
            type="number"
            placeholder="Days must be less than 8"
            className=" border-slate-500 border-2 px-2 py-1 w-full"
          />
        </div>
        <div className="mt-4">
          <h2 className="font-medium text-lg">Select budget plan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {budgetOptions.map((item, index) => (
              <div
                onClick={() => handleChange("budget", item.title)}
                key={index}
                className={`border rounded-lg hover:bg-slate-100 hover:cursor-pointer p-4 ${
                  formData?.budget === item.title
                    ? "border-black shadow-md"
                    : ""
                }`}
              >
                <h2 className="text-2xl">{item.icon}</h2>
                <h2 className=" text-xl font-semibold mt-2">{item.title}</h2>
                <h2 className="text-sm font-medium mt-2">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-medium text-lg">Choose Your Crew</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {travelCategories.map((item, index) => (
              <div
                onClick={() => handleChange("traveler", item.people)}
                key={index}
                className={`border rounded-lg hover:bg-slate-100 hover:cursor-pointer p-4 ${
                  formData?.traveler === item.people
                    ? "border-black shadow-md"
                    : ""
                }`}
              >
                <h2 className="text-2xl">{item.icon}</h2>
                <h2 className=" text-xl font-semibold mt-2">{item.title}</h2>
                <h2 className="text-sm font-medium mt-2">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-5 mb-10">
        <button
          disabled={loading}
          onClick={generateMyTrip}
          className="outline outline-2 p-1 bg-blue-700 text-white rounded-lg"
        >
          {loading ? "Generating trip..." : "Generate My Trip"}
        </button>
      </div>
    </div>
  );
};

export default CreateTrip;
