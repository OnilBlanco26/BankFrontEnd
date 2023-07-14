import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { startRegister } from "../../../redux/actions/auth";
import { motion } from "framer-motion";
import creditCard from "../../../assets/creditCard.png"

export const Banner = () => {
  const modalRef = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const defaultValues = { name: "", password: "" };

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

  const submit = (data) => {
    dispatch(startRegister(data.name, data.password));
    reset(defaultValues);
  };

  return (
    <section className="mb-10">
      <button
        className="mt-14 w-full bg-gradient-to-r from-yellow-500/75 to-yellow-100 py-2 px-4 rounded-md  shadow-md font-bold text-gray-300 hover:bg-none hover:text-white hover:border-2 hover:border-orange hover transition-all duration-300"
        onClick={openModal}
      >
        Registrate Aqui!
      </button>
      {modalIsOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1 }}
          ref={modalRef}
          className="w-[90%] sm:max-w-[60%] md:max-w-[40%] lg:max-w-[30%] flex flex-col justify-start items-center z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50  rounded-lg backdrop-blur-md py-14"
          contentLabel="Example Modal"
        >
          <img
            className="w-12 h-12 absolute top-2 right-2"
            src={creditCard}
            alt=""
          />
          <h2 className="text-white font-bold mb-2 text-md sm:text-xl">
            Registrate Ahora!
          </h2>
          <form
            className="flex flex-col justify-start items-center w-full gap-4"
            onSubmit={handleSubmit(submit)}
          >
            <input
              className="w-[65%] mt-4 bg-transparent text-orange placeholder:text-white border-2 border-orange rounded-md p-2"
              type="text"
              placeholder="Ingresa Tu Nombre"
              {...register("name")}
            />
            <input
              className="w-[65%] mt-4 bg-transparent text-orange placeholder:text-white border-2 border-orange rounded-md p-2"
              type="password"
              placeholder="Ingresa la contraseña"
              {...register("password")}
            />

            <input
              className="w-[45%] bg-gradient-to-r from-yellow-500/75 to-yellow-100 py-2 rounded-md  shadow-md font-bold text-white hover:bg-none hover:text-white hover:border-2 hover:border-orange hover transition-all duration-300 mt-4"
              type="submit"
              value="Register"
            />
          </form>
        </motion.div>
      ) : null}
    </section>
  );
};
