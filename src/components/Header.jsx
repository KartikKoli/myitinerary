import React, { useEffect, useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user exists in localStorage and update state
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const signIn = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log(err),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
      });
  };

  return (
    <div className="flex justify-between items-center bg-gray-400 py-2 px-2 sm:px-3 lg:px-5">
      <Link to="/">
      <div className="flex gap-2 items-center">
        <img src="/logo.svg" alt="logo"/>
        <p className="font-bold text-base sm:text-lg lg:text-xl">makemyitinerary</p>
      </div>  
    </Link>
      <div className="flex gap-4 items-center">
        <Link
          to="/createtrip"
          className="hover:bg-gray-200 font-semibold text-base sm:text-lg lg:text-xl"
        >
          Generate Trip
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex flex-col rounded-md p-1">
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  alt="profile"
                  className="w-[35px] h-[35px] rounded-full cursor-pointer"
                ></img>
              </PopoverTrigger>
              <PopoverContent>
                <Link
                  to="/mytrips"
                  className="hover:bg-slate-300"
                >
                  My Trips
                </Link>
                <p
                  className="rounded-md cursor-pointer hover:bg-slate-300 mt-2"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <button
            onClick={signIn}
            className="flex items-center gap-1 p-1 bg-black text-white"
          >
            <FcGoogle></FcGoogle>Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
