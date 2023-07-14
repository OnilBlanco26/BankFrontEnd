import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Consign } from "../pages/home/components/Consign";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import creditCard from "../assets/creditCard.png";
import { startLogin } from "../redux/actions/auth";

const Element = ({ name, showModal }) => {
  const modalRef = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSelected, setIsSelected] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const { accountNumber } = useSelector((state) => state.auth);

  const defaultValues = { accountNumber: "", password: "" };

  const submit = (data) => {
    dispatch(startLogin(data.accountNumber, data.password));
    // navigate("/bank/home");
    reset(defaultValues);
  };

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (modalIsOpen) {
      window.addEventListener("mousedown", handleClickOutsideModal);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [modalIsOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const logout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="">
      <button
        className=" hover:scale-125 transition-all duration-300"
        onClick={openModal}
      >
        {name}
      </button>
      {modalIsOpen ? (
        <div className="flex flex-col">
          <div className="flex flex-col border-2 border-green rounded-md">
            <motion.div
              initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, opacity: 1 }}
              ref={modalRef}
              className="w-[90vw] md:w-[40vw] md:min-w-[40vw]  md:h-[460px] px-2 flex flex-col justify-start items-center z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50  rounded-lg backdrop-blur-md py-14"
              contentLabel="Example Modal"
            >
              <img
                className="w-12 h-12 absolute top-2 right-2"
                src={creditCard}
                alt=""
              />
              <h2 className="text-white font-bold mb-2 text-md md:text-xl">
                Iniciar Sesion
              </h2>
              <form
                className="flex flex-col justify-center items-center gap-4"
                onSubmit={handleSubmit(submit)}
              >
                <div className="w-full flex gap-1 justify-center items-center mt-5 md:mt-10">
                  <input
                    className={`w-[80%] text-md md:text-xl rounded-md bg-transparent p-1 md:p-2 placeholder:text-gray-100 placeholder:font-bold text-white ${
                      isSelected
                        ? "border-double border-4 border-green"
                        : "border-2 border-green"
                    }`}
                    type="text"
                    placeholder="Numero De Cuenta"
                    {...register("accountNumber")}
                  />
                </div>
                <div className="w-full flex gap-4 justify-center items-center mt-5 md:mt-10">
                  <input
                    className="w-[80%] text-md md:text-xl rounded-md bg-transparent border-2 border-green p-1 md:p-2 placeholder:text-gray-100 placeholder:font-bold text-white"
                    type="password"
                    placeholder="Contraseña"
                    {...register("password")}
                  />
                </div>
                <div className="w-[50%] md:w-[20%] rounded-full flex items-center justify-center font-bold uppercase gap-2 bg-green shadow-md mt-5 md:mt-10 hover:scale-110 transition-all duration-300 active:scale-125 ">
                  <button
                    className="w-full flex items-center justify-center"
                    type="submit"
                  >
                    <i className="bx bx-send text-white md:py-2 text-4xl"></i>
                  </button>
                </div>
              </form>
            </motion.div>

            {/*  */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logged, setLogged] = useState(false);
  const { accountNumber } = useSelector((state) => state.auth);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleClickHamburguer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-8 w-full  flex justify-between text-white font-poppins text-2xl">
      <div className="flex flex-col justify-center items-center">
        <i className="relative top-8 md:top-0 fa-solid fa-building-columns text-3xl md:text-5xl text-orange p-0 "></i>
        &nbsp;
        <b className="text-orange font-bold relative -top-3 hidden md:block">
          PixelHub <span className="text-gray-100 font-normal">BANK</span>{" "}
        </b>
      </div>
      {!accountNumber ? (
        <>
          <div className="hidden md:w-[60%] md:flex justify-between items-center text-orange font-bold">
            <p className=" hover:scale-125 transition-all duration-300 active:scale-50">
              Home
            </p>
            <Element name="Personal Banking" />
            <Element name="Corporate Banking" />
          </div>
          <button
            onClick={handleClickHamburguer}
            className="absolute right-10 top-20 flex-col justify-center items-center md:hidden"
          >
            <span
              className={`bg-orange block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm  ${
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
            ></span>
            <span
              className={`bg-orange block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm my-0.5 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`bg-orange block transition-all duration-300 ease-out h-0.5 w-7 rounded-sm  ${
                isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              }`}
            ></span>
          </button>
        </>
      ) : null}
      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col justify-between items-center z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 rounded-lg backdrop-blur-md py-32"
        >
          <nav className="flex items-center justify-center flex-wrap mt-2">
          <div className="flex flex-col h-full w-full gap-5 justify-center items-center text-orange font-bold">
            <p className="hover:scale-125 transition-all duration-300 active:scale-50">
              Home
            </p>
            <Element name="Banco personal" />
            <Element name="Banco corporativo" />
          </div>
          </nav>
        </motion.div>
      ) : null}
    </nav>
  );
};
