import React from "react";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const logged = false;
  const { accountNumber } = useSelector((state) => state.auth);

  return (
    <nav className="p-8 w-full  flex justify-between text-white font-poppins text-2xl">
      <div className="flex flex-col justify-center items-center">
        <i className="fa-solid fa-building-columns text-5xl text-orange p-0 "></i>
        &nbsp;
        <b className="text-orange font-bold relative -top-3">
          PixelHub <span className="text-gray-100 font-normal">BANK</span>{" "}
        </b>
        
      </div>
      {
        !accountNumber ? 
      <ul className="w-[60%] flex justify-between items-center text-orange font-bold">
        <li>Home</li>
        <li>Personal Banking</li>
        <li>Corporate Banking</li>
        <li>Login</li>
      </ul> : null
      }

    </nav>
  );
};
