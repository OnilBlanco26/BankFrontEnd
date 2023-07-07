import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startLogin, startLogout } from "../redux/actions/auth";

export const Navbar = () => {
  // const logged = false;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const { accountNumber } = useSelector((state) => state.auth);

  const defaultValues = { accountNumber: "", password: "" };

  const submit = (data) => {
    dispatch(startLogin(data.accountNumber, data.password));
    // navigate("/bank/home");
    reset(defaultValues);
  };

  const logout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className="p-8 w-full  flex justify-between">
    <div>
    <i className="fa-solid fa-building-columns text-3xl"></i>
          &nbsp;
    <b className="text-red-400">PixelHub</b>BANK
    </div>
    <ul className="w-[60%] flex  justify-between items-center">
      <li>Home</li>
      <li>Personal Banking</li>
      <li>Corporate Banking</li>
      <li>Login</li>
    </ul>

      {/* {accountNumber ? (
        <button className="btn-back" onClick={logout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      ) : (
        <form className="navbar-form" onSubmit={handleSubmit(submit)}>
          <input
            type="text"
            placeholder="accountNumber"
            {...register("accountNumber")}
          />
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          <button type="submit">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </form>
      )} */}
    </nav>
  );
};
